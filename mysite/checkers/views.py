from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views import generic
from django.views.generic.base import TemplateView
from .models import Game, Turn
from django.urls import reverse
from django.shortcuts import get_object_or_404, render
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy

class IndexView(generic.ListView):
    model = Game
    template_name = 'checkers/index.html'


class GameView(TemplateView):
    model = Turn
    template_name = 'checkers/game.html' 


class GameCreate(LoginRequiredMixin, CreateView):
    model = Game
    fields = ['player_name']
    def game_view(request):
        return render('checkers/game_form.html', {'games': Game.objects.latest
        })
    def get_success_url(self):
        print('yo')
        return reverse_lazy('checkers:game', args=([self.object.id]))

def post_move(request, pk):
        color = request.GET.get('color', None)
        game_state = request.GET.get('game_state', None)
        data = {'color': color, 'game_state': game_state}
        print(data)
        move = Turn.objects.create(game_id=pk, color=data['color'], game_state=data['game_state'])
        move.save()
        return JsonResponse(data)   

