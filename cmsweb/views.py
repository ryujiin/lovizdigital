from django.shortcuts import render
from rest_framework import viewsets
from models import *
from serializers import *

from django.views.generic import TemplateView

# Create your views here.
class CarruselViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = CarruselSerializer
	
	def get_queryset(self):
		queryset = Carrusel.objects.filter(activo=True).order_by('-pk')
		return queryset

class TiendaView(TemplateView):
	template_name = "index.html"