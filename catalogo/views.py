from django.shortcuts import render
from django.http import HttpResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from models import *
from serializers import *

from datetime import datetime, timedelta, time

how_many_days = 20

class CatalogoViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = ProductoSingleSereializer
	
	def get_queryset(self):
		queryset = Producto.objects.filter(activo=True).order_by('-actualizado')
		categoria = self.request.query_params.get('categoria', None)
		slug = self.request.query_params.get('slug',None)
		limite = self.request.query_params.get('limite',None)
		if limite:
			queryset = queryset[:limite]
		if categoria:
			if categoria == 'ofertas':
				queryset = queryset.filter(producto=True)
			elif categoria == 'novedades':
				queryset = queryset.filter(actualizado__gte=datetime.now()-timedelta(days=how_many_days))
			else:
				queryset = queryset.filter(categorias__slug=categoria)

		if slug:
			queryset = queryset.filter(slug=slug)
		return queryset
	
class CatalogoOficinaViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = ProductoSingleSereializer
	permission_classes = (IsAdminUser,)
	
	
	def get_queryset(self):
		queryset = Producto.objects.filter(activo=True).order_by('-pk')
		categoria = self.request.query_params.get('categoria', None)
		slug = self.request.query_params.get('slug',None)
		limite = self.request.query_params.get('limite',None)
		if categoria:
			if limite:
				queryset = queryset.filter(categorias__slug=categoria)[:limite]
			else:
				queryset = queryset.filter(categorias__slug=categoria)
		if slug:
			queryset = queryset.filter(slug=slug)
		return queryset
	


# Create your views here.
class CategoriaViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = CategoriaSerializer
	queryset = Categoria.objects.all()