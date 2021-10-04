import os
from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from django.views.static import serve
from django.views.generic.base import TemplateView

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_ROOT = os.path.join(BASE_DIR, 'site')
app_name = 'mysite'
urlpatterns = [
    path('checkers/', include('checkers.urls', namespace='checkers')),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='home/index.html')),
    url(r'^site/(?P<path>.*)$', serve,
        {'document_root': SITE_ROOT, 'show_indexes': True},
        name='site_path'
    ),
]
