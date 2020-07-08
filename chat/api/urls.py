from django.urls import path, re_path, include
from .views import *

app_name = 'chat'


urlpatterns = [
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('<pk>', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),
    path('contact/', ContactListView.as_view()),
    path('contact_create/', ContactCreateView.as_view()),
    path('contact_detail/', ContactDetailView.as_view()),
    path('contact/<pk>/update/', ContactUpdateView.as_view()),
    path('contact/<pk>/delete/', ContactDeleteView.as_view()),
]
