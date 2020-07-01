from django.urls import path, re_path, include
from rest_framework import routers
from .views import (
    ChatListView,
    ChatDetailView,
    ChatCreateView,
    ChatUpdateView,
    ChatDeleteView,
    ContactViewset
)

app_name = 'chat'

router = routers.DefaultRouter()
router.register('contact', ContactViewset)
urlpatterns = [
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('<pk>', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),
    path('', include(router.urls))

]
