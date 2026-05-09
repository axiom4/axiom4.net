from django.conf import settings
from rest_framework import permissions


def get_client_ip(request):
    remote_addr = request.META.get('REMOTE_ADDR', '').strip()
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    trusted_proxies = set(getattr(settings, 'TRUSTED_PROXY_IPS', []))

    if remote_addr in trusted_proxies and x_forwarded_for:
        forwarded_chain = [ip.strip() for ip in x_forwarded_for.split(',') if ip.strip()]
        full_chain = forwarded_chain + [remote_addr]

        # Walk from the rightmost hop back to the original client and stop at
        # the first address that is not one of our explicitly trusted proxies.
        for ip_addr in reversed(full_chain):
            if ip_addr not in trusted_proxies:
                return ip_addr

    return remote_addr


class AccessListPermission(permissions.BasePermission):
    """
    Global permission check for blocked IPs.
    """

    def has_permission(self, request, view):
        ip_addr = get_client_ip(request)
        return ip_addr in settings.ACCESS_LIST
