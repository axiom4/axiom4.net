from rest_framework import serializers
from .models import Page, Post
from django.contrib.auth.models import User, Group


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name='user-detail')

    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'first_name', 'last_name', 'email']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


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


class PostSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name='post-detail')

    class Meta:
        fields = (
            "id",
            "url",
            "author",
            "title",
            "body",
            "created_at",
        )

        model = Post
