from rest_framework import viewsets
from Blog.models import Page
from rest_framework import permissions
from Blog.serializers import PageSerializer


class PageViewset(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "tag"
    http_method_names = ['get']
