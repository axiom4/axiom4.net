from django.contrib import admin

from .models import Page, Post, Category
from ImageUpload.models import ImageUpload

from django.db import models
from mdeditor.widgets import MDEditorWidget

from django import forms


class ImageInline(admin.TabularInline):
    model = ImageUpload
    readonly_fields = ['image_tag']
    extra = 0


class PageModelForm(forms.ModelForm):
    title = forms.CharField()
    title.widget.attrs.update({'style': 'width: 600px'})

    class Meta:
        model = Page
        fields = ['title', 'author', 'tag', 'body']


class PageAdmin(admin.ModelAdmin):
    fields = [
        ('title'),
        ('author', 'tag'),
        'body'
    ]
    list_display = ('title', 'tag', 'author')
    save_on_top = True
    search_fields = ['title',]
    formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget},
    }

    form = PageModelForm

    def get_form(self, request, obj=None, **kwargs):
        form = super(PageAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user
        return form


class PostModelForm(forms.ModelForm):
    title = forms.CharField()
    title.widget.attrs.update({'style': 'width: 600px'})

    summary = forms.CharField(widget=forms.Textarea())
    summary.widget.attrs.update({'style': 'width: 600px; resize: none'})

    class Meta:
        model = Post
        fields = ['title', 'author', 'summary', 'categories', 'body', 'image']


class PostAdmin(admin.ModelAdmin):
    save_on_top = True
    fields = [
        ('title', 'author', 'image', 'image_tag'),
        ('summary', 'categories'),
        'body'
    ]

    list_display = ('title', 'summary', 'image', 'image_tag', 'author')
    search_fields = ['title', 'summary']
    inlines = [ImageInline, ]
    formfield_overrides = {
        models.TextField: {'widget': MDEditorWidget}
    }
    readonly_fields = ['image_tag']
    form = PostModelForm

    def get_form(self, request, obj=None, **kwargs):
        form = super(PostAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user

        return form


class CategoryAdmin(admin.ModelAdmin):
    fields = ['name']


admin.site.register(Page, PageAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
