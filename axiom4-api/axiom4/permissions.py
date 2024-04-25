from django.conf import settings
from rest_framework import permissions

class AccessListPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        return ip_addr in settings.ACCESS_LIST