from django.conf import settings
from rest_framework import permissions


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        # Take the last IP added by the trusted proxy (rightmost), not the
        # client-supplied leftmost value which can be trivially spoofed.
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '')
    return ip.strip()


class AccessListPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        ip_addr = get_client_ip(request)
        return ip_addr in settings.ACCESS_LIST
