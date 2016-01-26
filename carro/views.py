
from django.shortcuts import render
from rest_framework import viewsets

from django.http import HttpResponse, Http404
from serializers import CarroSerializer,LineaSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from models import *

class CarritoViewsApi(APIView):
	def get_object(self):
		coockie_carro = self.request.GET.get('session')
		if self.request.user.is_authenticated():
			carro_fijo = self.request.GET.get('c_f')
			if carro_fijo:
				carro = Carro.objects.get(pk=carro_fijo,estado="Abierto")
				carro.propietario = self.request.user				
				#obtengo_carro_antiguo				
				carro.save()				
				return carro
			else:				
				try:
					return Carro.objects.get(propietario=self.request.user,estado="Abierto")
				except Carro.DoesNotExist:
					raise Http404
		else:
			try:
				return Carro.objects.get(sesion_carro=coockie_carro,estado="Abierto")
			except Carro.DoesNotExist:
				raise Http404


	def get(self,request,format=None):
		carro = self.get_object()
		serializer = CarroSerializer(carro)
		return Response(serializer.data,status=status.HTTP_200_OK)
		
	def post(self, request, format=None):
		serializer = CarroSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	

class CarritoDetailViews(APIView):
	def get_object(self,pk):
		try:
			return Carro.objects.get(pk=pk,estado='Abierto')
		except Carro.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		carro = self.get_object(pk)
		serializer = CarroSerializer(carro)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		carro = self.get_object(pk)
		serializer = CarroSerializer(carro,data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response (serializer.data)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LineasViewsets(viewsets.ModelViewSet):
	queryset = LineaCarro.objects.filter(activo=True)
	serializer_class = LineaSerializer

	def list(self,request):
		carro = request.GET.get('carro')
		if carro =='':
			carro = 0
		queryset = LineaCarro.objects.filter(carro=carro,activo=True)
		serializer = LineaSerializer(queryset,many=True)
		return Response(serializer.data)

class CarroViewsets(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset = Carro.objects.all()
	serializer_class = CarroSerializer

	def create(self,request):
		pass