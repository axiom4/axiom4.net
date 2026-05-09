from django.contrib import admin
from django.conf import settings

from .models import Page, Post, Category
from ImageUpload.models import ImageUpload

from django.db import models
from martor.widgets import AdminMartorWidget

from django import forms


def _prefixed(path):
    script_name = getattr(settings, 'SCRIPT_NAME', '') or ''
    script_name = script_name.rstrip('/')
    if not script_name or not path.startswith('/'):
        return path
    if path == script_name or path.startswith(script_name + '/'):
        return path
    return script_name + path


MARTOR_ADMIN_WIDGET = AdminMartorWidget(attrs={
    'data-markdownfy-url': _prefixed('/martor/markdownify/'),
    'data-upload-url': _prefixed('/martor/uploader/'),
    'data-search-users-url': _prefixed('/martor/search-user/'),
})


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
    class Media:
        css = {
            'all': ('blog/css/admin-martor-fix.css',)
        }
        js = ('blog/js/admin-mermaid-v2.js',)

    fields = [
        ('title'),
        ('author', 'tag'),
        'body'
    ]
    list_display = ('title', 'tag', 'author')
    save_on_top = True
    search_fields = ['title',]
    formfield_overrides = {
        models.TextField: {'widget': MARTOR_ADMIN_WIDGET},
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
    class Media:
        css = {
            'all': ('blog/css/admin-martor-fix.css',)
        }
        js = ('blog/js/admin-mermaid-v2.js',)

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
        models.TextField: {'widget': MARTOR_ADMIN_WIDGET}
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
