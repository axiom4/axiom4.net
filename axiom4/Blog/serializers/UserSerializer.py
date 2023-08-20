from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        read_only=True, view_name='user-detail')

    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'first_name', 'last_name', 'email']
