from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from . import Category
from django.utils.html import format_html

from axiom4.image_upload_security import (
    SecureOverwriteStorage,
    process_uploaded_image,
    validate_uploaded_image,
)

# Compatibility alias for historical imports and frozen migration references.
OverwriteStorage = SecureOverwriteStorage


def image_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'posts/{0}/{1}'.format(instance.id, "image_preview.webp")


class Post(models.Model):
    title = models.CharField(max_length=150)
    body = models.TextField()
    summary = models.CharField(max_length=250, blank=True)
    image = models.ImageField(
        null=True, upload_to=image_directory_path, storage=SecureOverwriteStorage())
    categories = models.ManyToManyField(Category)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['author']),
        ]

    def save(self, *args, **kwargs):
        if self.image and not getattr(self.image, '_committed', True):
            validate_uploaded_image(self.image)
            self.image_save()

        super(Post, self).save(*args, **kwargs)

    def image_save(self):
        self.image = process_uploaded_image(
            self.image,
            width=900,
            quality=75,
            lossless=False,
            method=5,
        )

    def image_tag(self):
        return format_html('<img src="{}{}" width="150" />', settings.MEDIA_URL, self.image) if self.image else ''

    image_tag.short_description = 'Image Preview'
