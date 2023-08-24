from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from . import Category

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

import sys

from django.utils.html import mark_safe


def image_directory_path(instance, filename):
    print(vars(instance))
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'posts/{0}/preview_image.jpg'.format(instance.id)


def resize_image(image: Image.Image, width: int) -> Image.Image:
    img_width, _ = image.size

    if img_width <= width:
        return image

    height = image.height * width // image.width

    return image.resize((width, height))


class Post(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    summary = models.CharField(max_length=250, null=True, blank=True, )
    image = models.ImageField(null=True, upload_to=image_directory_path)
    category = models.ManyToManyField(Category)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self):
        self.image_save()

        super(Post, self).save()

    def image_save(self):
       # Opening the uploaded image
        image = Image.open(self.image)

        output = BytesIO()

        # Resize/modify the image
        image = resize_image(image=image, width=900)

        # after modifications, save it to the output
        image.save(output, format='jpeg', quality=100)
        output.seek(0)

        # change the imagefield value to be the newley modifed image value
        self.image = InMemoryUploadedFile(
            output,
            'ImageField',
            "%s.jpg" % self.image.name.split('.')[0],
            'image/jpeg',
            sys.getsizeof(output),
            None
        )

    def image_tag(self):
        return mark_safe('<img src="/%s/%s" width="150" />' % (settings.MEDIA_ROOT, self.image)) if self.image else ''

    image_tag.short_description = 'Image Preview'
