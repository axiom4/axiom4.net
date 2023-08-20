from rest_framework import viewsets
from Blog.models import Post
from rest_framework import permissions
from Blog.serializers import PostSerializer
from rest_framework.filters import SearchFilter


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [SearchFilter]
    http_method_names = ['get']

    search_fields = [
        '$title',
        '$body'
    ]
