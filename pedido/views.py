from django.shortcuts import render,render_to_response

from rest_framework import viewsets

from django.http import HttpResponse, Http404
from serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from models import * 
from carro.models import Carro

class PedidoViewSet(viewsets.ModelViewSet):
	serializer_class = PedidoSerializer

	def get_queryset(self):
		if self.request.user.is_authenticated:
			queryset = Pedido.objects.filter(user=self.request.user.pk)
		return queryset

class MetodoEnvioViewSet(viewsets.ModelViewSet):
	serializer_class = MetodoEnvioSerializer
	queryset = MetodoEnvio.objects.all()


@csrf_exempt
def felicidades(request):
	if request.POST:
		#print request.POST
		metodo = MetodoPago.objects.get(nombre='Paypal')
		pedido = Pedido.objects.get(numero_pedido=request.POST['invoice'])
		carro = Carro.objects.get(pedido=pedido.pk)		
		pago = Pago(cantidad=request.POST['payment_gross'],
			id_pago = request.POST['invoice'],
			metodo_pago = metodo,
			descripcion = request.POST['payment_status'],
			transaccion = request.POST['txn_id'])
		pago.save()

		pedido.pago_pedido = pago
		pedido.metodo_pago = metodo
		pedido.save()
		
		carro.estado = carro.ENVIADA
		carro.save()
		
		
	return render_to_response('index.html', {"foo": "bar"})