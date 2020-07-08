
from django.contrib import admin
from django.urls import path, include
from chat.views import FacebookLogin
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.api.urls'), name='chat'),
    path('accounts/', include('accounts.urls'), name='accounts'),
    path('', TemplateView.as_view(template_name='index.html'), name='frontend'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
