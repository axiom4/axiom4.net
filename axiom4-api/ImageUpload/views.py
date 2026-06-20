import os
from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404
from django.views.decorators.cache import cache_control

from PIL import Image

_ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
_MIN_WIDTH = 50
_MAX_WIDTH = 1200


def _resolve_within(base_dir: str, *parts: str) -> str:
    """Resolve ``parts`` under ``base_dir`` and reject any escape from it."""
    candidate = os.path.realpath(os.path.join(base_dir, *parts))
    if candidate != base_dir and not candidate.startswith(base_dir + os.sep):
        raise Http404
    return candidate


@cache_control(public=True, max_age=31536000)
def thumbnail(request, width: int, image_path: str):
    """Serve a width-capped WebP thumbnail of a MEDIA_ROOT image.

    Resized files are cached at MEDIA_ROOT/thumb/<width>/<stem>.webp so that
    subsequent requests are served directly without reprocessing.
    """
    if not (_MIN_WIDTH <= width <= _MAX_WIDTH):
        raise Http404

    media_root = os.path.realpath(settings.MEDIA_ROOT)

    # Security: reject any path that escapes MEDIA_ROOT
    original = Path(_resolve_within(media_root, image_path))

    if not original.is_file():
        raise Http404

    if original.suffix.lower() not in _ALLOWED_EXTENSIONS:
        raise Http404

    # Cache path: always stored as WebP to benefit from format conversion
    rel_dir = os.path.dirname(image_path)
    stem = Path(image_path).stem
    cache_path = Path(_resolve_within(
        media_root, 'thumb', str(width), rel_dir, stem + '.webp'))

    if not cache_path.is_file() or cache_path.stat().st_mtime < original.stat().st_mtime:
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(original) as img:
            orig_w, orig_h = img.size
            if orig_w > width:
                new_h = round(orig_h * width / orig_w)
                img = img.resize((width, new_h), Image.Resampling.LANCZOS)
            out = img if img.mode in (
                'RGB', 'RGBA', 'L', 'LA') else img.convert('RGB')
            # Write atomically: temp file then rename
            tmp = cache_path.with_suffix('.tmp')
            out.save(tmp, 'WEBP', quality=85, method=4)
            tmp.replace(cache_path)

    return FileResponse(open(cache_path, 'rb'), content_type='image/webp')
