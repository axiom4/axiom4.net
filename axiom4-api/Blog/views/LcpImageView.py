from django.http import JsonResponse
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_GET

from Blog.models import Post


@require_GET
@cache_control(public=True, max_age=300)
def lcp_image(request):
    """Return the MEDIA_ROOT-relative path of the latest post image for LCP preloading.

    The client uses this to inject a <link rel="preload"> before Angular boots,
    so the LCP image download starts in parallel with JS execution.

    Cached for 5 minutes (public) — short enough to reflect new posts quickly
    while still avoiding per-request DB queries on repeated page loads.
    """
    post = (
        Post.objects.filter(image__isnull=False)
        .exclude(image='')
        .order_by('-created_at')
        .only('image')
        .first()
    )
    if post and post.image:
        return JsonResponse({'path': post.image.name})
    return JsonResponse({'path': None})
