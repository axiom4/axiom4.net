from rest_framework import viewsets
from Blog.models import Post
from rest_framework import permissions
from Blog.serializers import PostSerializer, PostPreviewSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.response import Response


class PostPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [SearchFilter, OrderingFilter]
    http_method_names = ['get']
    pagination_class = PostPagination

    ordering_fields = '__all__'

    search_fields = [
        '$title',
        '$body'
    ]

    def get_serializer_class(self):
        if self.action == 'list':
            return PostPreviewSerializer
        else:
            return self.serializer_class

    # @action(detail=False, methods=['GET'])
    # def post_preview_list(self, request):
    #     queryset = self.filter_queryset(self.get_queryset())

    #     page = self.paginate_queryset(queryset)

    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)

    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(page, many=True)

    #     return Response(serializer.data)
