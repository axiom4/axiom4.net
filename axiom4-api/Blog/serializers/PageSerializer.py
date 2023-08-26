from rest_framework import serializers
from Blog.models import Page

from Blog.serializers import UserSerializer


class PageSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name='page-detail', lookup_field='tag')

    author = UserSerializer(read_only=True)

    class Meta:
        fields = (
            "id",
            "url",
            "tag",
            "author",
            "title",
            "body",
            "created_at",
        )

        model = Page
