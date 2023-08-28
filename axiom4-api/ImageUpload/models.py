from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from Blog.models import Post
from django.utils.html import mark_safe

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


from django.core.files.storage import FileSystemStorage
import os

class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name, max_length=None):
        """Returns a filename that's free on the target storage system, and
        available for new content to be written to.

        Found at http://djangosnippets.org/snippets/976/

        This file storage solves overwrite on upload problem. Another
        proposed solution was to override the save method on the model
        like so (from https://code.djangoproject.com/ticket/11663):

        def save(self, *args, **kwargs):
            try:
                this = MyModelName.objects.get(id=self.id)
                if this.MyImageFieldName != self.MyImageFieldName:
                    this.MyImageFieldName.delete()
            except: pass
            super(MyModelName, self).save(*args, **kwargs)
        """
        # If the filename already exists, remove it as if it was a true file system
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name

def directory_path(instance, filename):
    print(vars(instance))
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'posts/{0}/{1}.webp'.format(instance.post.id, instance.short_name)


def resize_image(image: Image.Image, width: int) -> Image.Image:
    img_width, _ = image.size

    if img_width <= width:
        return image

    height = image.height * width // image.width

    return image.resize((width, height), resample=Image.LANCZOS)


class ImageUpload(models.Model):
    title = models.CharField(max_length=250, null=False)
    image = models.ImageField(null=False, upload_to=directory_path, storage=OverwriteStorage())
    short_name = models.CharField(max_length=20, null=False)

    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    author = models.ForeignKey(
        User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def image_tag(self):
        return mark_safe('<img src="/%s/%s" width="150" />' % (settings.MEDIA_ROOT, self.image)) if self.image else ''

    image_tag.short_description = 'Image Preview'

    def save(self):
        # Opening the uploaded image
        image = Image.open(self.image)

        output = BytesIO()

        # Resize/modify the image
        image = resize_image(image=image, width=900)

        # after modifications, save it to the output
        image.save(
            output, 
            format='webp', 
            optimize=True, 
            lossless=True, 
            quality=100,
            method=6
        )        
        
        output.seek(0)

        # change the imagefield value to be the newley modifed image value
        self.image = InMemoryUploadedFile(
            output,
            'ImageField',
            "%s.webp" % self.image.name.split('.')[0],
            'image/webp',
            sys.getsizeof(output),
            None
        )

        super(ImageUpload, self).save()

    class Meta:
        unique_together = [["short_name", "post"]]
