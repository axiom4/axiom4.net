from django.contrib import admin

from .models import Page, Post
from ImageUpload.models import ImageUpload


class ImageInline(admin.TabularInline):
    model = ImageUpload
    readonly_fields = ['image_tag']
    extra = 0


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')
    search_fields = ['title',]
    inlines = [ImageInline, ]


admin.site.register(Page)
admin.site.register(Post, PostAdmin)
