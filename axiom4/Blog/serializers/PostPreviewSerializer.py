from rest_framework import serializers
from Blog.models import Post
from Blog.serializers import UserSerializer


class PostPreviewSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name='post-detail')

    author = UserSerializer(read_only=True)

    class Meta:
        fields = (
            "id",
            "url",
            "author",
            "title",
            "created_at",
            'image',
            'summary'
        )

        model = Post
