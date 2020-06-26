
from django.contrib import admin
from django.urls import path, include
from chat.views import FacebookLogin
urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.api.urls'), name='chat'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
]
