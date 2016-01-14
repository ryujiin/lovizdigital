from django.shortcuts import render
from rest_framework import viewsets
from models import *
from serializers import *
# Create your views here.

class ColorViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = ColorSerializer
	queryset = Color.objects.all();

class TallasViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = TallaSerializer
	queryset = Talla.objects.all();

def tipo_cambio(request):
	if request.POST:
		pass