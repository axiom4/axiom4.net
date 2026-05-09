from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from Blog.models import Post
from django.utils.html import format_html

from axiom4.image_upload_security import (
    SecureOverwriteStorage,
    process_uploaded_image,
    validate_short_name,
    validate_uploaded_image,
)

# Compatibility alias for historical imports and frozen migration references.
OverwriteStorage = SecureOverwriteStorage


def directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'posts/{0}/{1}.webp'.format(instance.post.id, instance.short_name)

class ImageUpload(models.Model):
    title = models.CharField(max_length=250, null=False)
    image = models.ImageField(
        null=False, upload_to=directory_path, storage=SecureOverwriteStorage())
    short_name = models.CharField(max_length=20, null=False)

    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    author = models.ForeignKey(
        User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def image_tag(self):
        return format_html('<img src="{}{}" width="150" />', settings.MEDIA_URL, self.image) if self.image else ''

    image_tag.short_description = 'Image Preview'

    def save(self, *args, **kwargs):
        validate_short_name(self.short_name)

        if self.image and not getattr(self.image, '_committed', True):
            validate_uploaded_image(self.image)
            self.image = process_uploaded_image(
                self.image,
                width=900,
                quality=100,
                lossless=True,
                method=6,
            )

        super(ImageUpload, self).save(*args, **kwargs)

    class Meta:
        unique_together = [["short_name", "post"]]
