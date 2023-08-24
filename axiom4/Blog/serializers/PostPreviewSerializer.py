from rest_framework import serializers
from Blog.models import Post
from Blog.serializers import UserSerializer, CategorySerializer


class PostPreviewSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name='post-detail')

    author = UserSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='name')

    class Meta:
        fields = (
            "id",
            "url",
            "author",
            "title",
            "created_at",
            'image',
            'categories',
            'summary'
        )

        model = Post
