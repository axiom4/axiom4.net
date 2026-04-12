from pathlib import Path

from django.conf import settings
from django.core.cache import cache
from django.http import HttpResponse
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_GET

from Blog.models import Post

_CACHE_KEY = 'spa_lcp_preload_link'
_CACHE_TTL = 300  # 5 minutes


@require_GET
@cache_control(no_store=True)
def spa_index(request):
    """Serve index.html with an LCP <link rel="preload"> already injected in <head>.

    Querying the latest post image is cached for 5 minutes so repeated home-page
    loads do not hit the database.  The HTTP response itself is no-store so the
    browser always re-fetches HTML (the preload path changes when a new post is
    published).
    """
    preload = cache.get(_CACHE_KEY)
    if preload is None:
        post = (
            Post.objects.filter(image__isnull=False)
            .exclude(image='')
            .order_by('-created_at')
            .only('image')
            .first()
        )
        if post and post.image:
            p = post.image.name
            preload = (
                f'<link rel="preload" as="image" type="image/webp"'
                f' href="/api/thumb/900/{p}"'
                f' imagesrcset="/api/thumb/480/{p} 480w, /api/thumb/900/{p} 900w"'
                f' imagesizes="(max-width:572px) 96vw, 50vw"'
                f' fetchpriority="high">'
            )
        else:
            preload = ''
        cache.set(_CACHE_KEY, preload, _CACHE_TTL)

    index_path = Path(settings.ANGULAR_DIST_DIR) / 'index.html'
    html = index_path.read_text(encoding='utf-8')
    if preload:
        html = html.replace('</head>', f'  {preload}\n  </head>', 1)

    return HttpResponse(html, content_type='text/html; charset=utf-8')
