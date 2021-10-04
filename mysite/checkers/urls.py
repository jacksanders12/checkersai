from django import urls
from django.urls import path

from . import views
app_name = 'checkers'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/game/', views.GameView.as_view(), name='game'),
    path('create/', views.GameCreate.as_view(), name='game_create'),
    path('<int:pk>/game/post_move', views.post_move, name='move'),
]