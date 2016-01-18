from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from models import *
from serializers import *

from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# Create your views here.
class CarruselViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = CarruselSerializer
	
	def get_queryset(self):
		queryset = Carrusel.objects.filter(activo=True).order_by('-pk')
		return queryset


class PageViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = PageSerializer

	def get_queryset(self):
		front = self.request.query_params.get('front', None)		
		slug = self.request.query_params.get('slug', None)		
		queryset = Page.objects.filter(activo=True)
		if front:
			queryset = queryset.filter(front=True)
		if slug:
			queryset = queryset.filter(slug=slug)
		return queryset

class MenuViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = MenuSerializer

	def get_queryset(self):
		queryset = Menu.objects.filter(activo=True).order_by('-pk')
		return queryset

def sitemap(request):
	return render(request, 'sitemap.html', {"foo": "bar"},
        content_type="application/xhtml+xml")



class TiendaView(TemplateView):
	template_name = "index.html"

class VerificarView(TemplateView):
	template_name = "veri.html"
