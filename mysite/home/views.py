from django.shortcuts import render
from .models import Game, Turns
from django.views import generic

class IndexView(generic.ListView):
    template_name = 'home/index.html'
    def get_queryset(self):
        return Game.objects.order_by('-date')[:5]
