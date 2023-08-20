from django.contrib import admin

from .models import Page, Post
from ImageUpload.models import ImageUpload

from django.db import models
from mdeditor.widgets import MDEditorWidget


class ImageInline(admin.TabularInline):
    model = ImageUpload
    readonly_fields = ['image_tag']
    extra = 0


class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'author')
    save_on_top = True
    search_fields = ['title',]
    formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget}
    }


class PostAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('title', 'author')
    search_fields = ['title',]
    inlines = [ImageInline, ]
    formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget}
    }


admin.site.register(Page, PageAdmin)
admin.site.register(Post, PostAdmin)