from django.shortcuts import render

from rest_framework import viewsets

from django.http import HttpResponse, Http404
from serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.
from models import * 

class PedidoViewSet(viewsets.ModelViewSet):
	serializer_class = PedidoSerializer

	def get_queryset(self):
		if self.request.user.is_authenticated:
			queryset = Pedido.objects.filter(user=self.request.user.pk)
		return queryset

class MetodoEnvioViewSet(viewsets.ModelViewSet):
	serializer_class = MetodoEnvioSerializer
	queryset = MetodoEnvio.objects.all()