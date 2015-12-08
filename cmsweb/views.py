from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from models import *
from serializers import *

from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class CarruselViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = CarruselSerializer
	
	def get_queryset(self):
		queryset = Carrusel.objects.filter(activo=True).order_by('-pk')
		return queryset

class TiendaView(TemplateView):
	template_name = "index.html"

@csrf_exempt
def felicidades(request):
	print request.POST
	return render_to_response('index.html', {"foo": "bar"})
