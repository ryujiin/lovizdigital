from rest_framework import serializers
from models import *
from django.conf import settings

class PagoSerializer(serializers.ModelSerializer):
	metodo_pago = serializers.CharField(read_only=True)
	class Meta:
		model = Pago

class PedidoSerializer(serializers.ModelSerializer):
	numero_pedido = serializers.CharField(read_only=True)
	estado_pedido = serializers.CharField(read_only=True)
	user = serializers.CharField(read_only=True)
	gasto_envio = serializers.CharField(read_only=True)
	class Meta:
		model = Pedido
		fields = ('id','numero_pedido','user',
					'gasto_envio','direccion_envio',
					'metodoenvio','fecha_compra','estado_pedido',
					'metodo_pago','telefono_pedido','pago_pedido')

class MetodoEnvioSerializer(serializers.ModelSerializer):
	class Meta:
		model = MetodoEnvio