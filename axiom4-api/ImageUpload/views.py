from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404
from django.utils.http import http_date
from django.views.decorators.cache import cache_control

from PIL import Image

_ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
_MIN_WIDTH = 50
_MAX_WIDTH = 1200


@cache_control(public=True, max_age=86400)
def thumbnail(request, width: int, image_path: str):
    """Serve a width-capped WebP thumbnail of a MEDIA_ROOT image.

    Resized files are cached at MEDIA_ROOT/thumb/<width>/<stem>.webp so that
    subsequent requests are served directly without reprocessing.
    """
    if not (_MIN_WIDTH <= width <= _MAX_WIDTH):
        raise Http404

    media_root = Path(settings.MEDIA_ROOT).resolve()

    # Security: reject any path that escapes MEDIA_ROOT
    original = (media_root / image_path).resolve()
    try:
        original.relative_to(media_root)
    except ValueError:
        raise Http404

    if not original.is_file():
        raise Http404

    if original.suffix.lower() not in _ALLOWED_EXTENSIONS:
        raise Http404

    # Cache path: always stored as WebP to benefit from format conversion
    rel_dir = Path(image_path).parent
    stem = Path(image_path).stem
    cache_path = (media_root / 'thumb' / str(width) / rel_dir / (stem + '.webp')).resolve()
    try:
        cache_path.relative_to(media_root)
    except ValueError:
        raise Http404

    if not cache_path.is_file() or cache_path.stat().st_mtime < original.stat().st_mtime:
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(original) as img:
            orig_w, orig_h = img.size
            if orig_w > width:
                new_h = round(orig_h * width / orig_w)
                img = img.resize((width, new_h), Image.Resampling.LANCZOS)
            out = img if img.mode in ('RGB', 'RGBA', 'L', 'LA') else img.convert('RGB')
            # Write atomically: temp file then rename
            tmp = cache_path.with_suffix('.tmp')
            out.save(tmp, 'WEBP', quality=85, method=4)
            tmp.replace(cache_path)

    return FileResponse(open(cache_path, 'rb'), content_type='image/webp')
