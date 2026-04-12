import django_filters
from rest_framework import viewsets
from Blog.models import Post, Category
from rest_framework import permissions
from Blog.serializers import PostSerializer, PostPreviewSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend


class PostPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 12


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').prefetch_related('categories').all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    http_method_names = ['get']
    pagination_class = PostPagination

    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']

    filterset_fields = ['categories__name']

    search_fields = [
        '$title',
        '$body'
    ]

    def get_serializer_class(self):
        if self.action == 'list':
            return PostPreviewSerializer
        else:
            return self.serializer_class
