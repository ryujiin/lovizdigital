from rest_framework import serializers
from models import *

class CarruselSerializer(serializers.ModelSerializer):
	seccion = serializers.CharField(read_only=True)
	foto = serializers.SerializerMethodField()
	class Meta:
		model = Carrusel
		fields = ('id','titulo','foto','seccion','creado','activo')

	def get_foto(self,obj):
		return obj.foto.url