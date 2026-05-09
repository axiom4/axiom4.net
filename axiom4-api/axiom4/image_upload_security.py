from io import BytesIO
from pathlib import Path
import re

from django.core.exceptions import ValidationError
from django.core.files.storage import FileSystemStorage
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image, ImageFile, UnidentifiedImageError

ImageFile.LOAD_TRUNCATED_IMAGES = False

ALLOWED_IMAGE_FORMATS = {"JPEG", "PNG", "WEBP", "GIF"}
MAX_UPLOAD_BYTES = 10 * 1024 * 1024
MAX_IMAGE_PIXELS = 25_000_000
SHORT_NAME_RE = re.compile(r"^[A-Za-z0-9_-]{1,20}$")


class SecureOverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            self.delete(name)
        return name


def validate_short_name(value):
    if not SHORT_NAME_RE.fullmatch(value or ""):
        raise ValidationError(
            "short_name can only contain letters, numbers, underscores and hyphens."
        )


def validate_uploaded_image(uploaded_file):
    if not uploaded_file:
        return

    if getattr(uploaded_file, "size", 0) > MAX_UPLOAD_BYTES:
        raise ValidationError("Image file is too large.")

    try:
        uploaded_file.seek(0)
        with Image.open(uploaded_file) as probe:
            image_format = (probe.format or "").upper()
            if image_format not in ALLOWED_IMAGE_FORMATS:
                raise ValidationError("Unsupported image format.")

            width, height = probe.size
            if width * height > MAX_IMAGE_PIXELS:
                raise ValidationError("Image dimensions are too large.")

            probe.verify()
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise ValidationError("Invalid image upload.") from exc
    finally:
        uploaded_file.seek(0)


def process_uploaded_image(uploaded_file, *, width, quality, lossless, method):
    validate_uploaded_image(uploaded_file)

    try:
        uploaded_file.seek(0)
        with Image.open(uploaded_file) as source_image:
            source_image.load()

            if source_image.width > width:
                new_height = source_image.height * width // source_image.width
                source_image = source_image.resize(
                    (width, new_height), resample=Image.Resampling.LANCZOS
                )

            if source_image.mode not in ("RGB", "RGBA"):
                source_image = source_image.convert(
                    "RGBA" if "transparency" in source_image.info else "RGB"
                )

            output = BytesIO()
            source_image.save(
                output,
                format="WEBP",
                optimize=True,
                lossless=lossless,
                quality=quality,
                method=method,
            )
            output.seek(0)
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise ValidationError("Failed to process image upload.") from exc
    finally:
        uploaded_file.seek(0)

    filename = f"{Path(getattr(uploaded_file, 'name', 'upload')).stem}.webp"
    return InMemoryUploadedFile(
        output,
        "ImageField",
        filename,
        "image/webp",
        output.getbuffer().nbytes,
        None,
    )
