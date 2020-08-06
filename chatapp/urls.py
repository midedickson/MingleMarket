
from django.contrib import admin
from django.urls import path, include
from chat.views import FacebookLogin
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.static import static
from chat.api.views import VerificationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', include('chat.api.urls'), name='chat'),
    path('accounts/', include('accounts.urls'), name='accounts'),
    path('activate/<uidb64>/<token>/',
         VerificationView.as_view(), name='activate'),
    path('', TemplateView.as_view(template_name='index.html'), name='frontend'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
