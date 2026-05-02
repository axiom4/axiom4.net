"""axiom4 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.urls import path, include
from rest_framework.schemas import get_schema_view

from rest_framework import permissions
from Blog import urls as blog_urls

from django.conf import settings
from django.conf.urls.static import static

from .permissions import AccessListPermission
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from ImageUpload.views import thumbnail
from Blog.views import lcp_image, spa_index
from mdeditor.views import UploadView

schema_url_patterns = [
    path('blog/', include(blog_urls.urlpatterns)),
]

urlpatterns = [
    path("blog/", include(blog_urls.urlpatterns)),
    path('admin/', admin.site.urls),
    path('mdeditor/uploads/', staff_member_required(UploadView.as_view()), name='mdeditor_uploads'),
    path('openapi', SpectacularAPIView().as_view(), name='schema'),
    path('',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('thumb/<int:width>/<path:image_path>',
         thumbnail, name='image-thumbnail'),
    path('lcp/', lcp_image, name='lcp-image'),
    path('spa-index/', spa_index, name='spa-index'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )
