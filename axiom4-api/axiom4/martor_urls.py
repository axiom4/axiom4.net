from django.contrib.admin.views.decorators import staff_member_required
from django.urls import path

from martor.views import (
    markdown_imgur_uploader,
    markdown_search_user,
    markdownfy_view,
)

urlpatterns = [
    path('markdownify/', staff_member_required(markdownfy_view), name='martor_markdownfy'),
    path('uploader/', staff_member_required(markdown_imgur_uploader), name='imgur_uploader'),
    path('search-user/', staff_member_required(markdown_search_user), name='search_user_json'),
]
