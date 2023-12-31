from rest_framework import viewsets
from rest_framework import permissions
from Blog.serializers import CategorySerializer
from Blog.models import Category
from django.db.models import Count


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    http_method_names = ['get']
