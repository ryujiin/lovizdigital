from models import *
from rest_framework import serializers
from django.contrib.auth.models import User as User
from cliente.models import Cliente


class DireccionSerilizer(serializers.ModelSerializer):
	class Meta:
		model = Direccion

class UsuarioSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username','first_name','last_name','email')

class PerfilUSerSerializer(serializers.ModelSerializer):
	email = serializers.SerializerMethodField('get_email')
	nombre = serializers.SerializerMethodField('get_nombre')
	apellido = serializers.SerializerMethodField('get_apellido')
	class Meta:
		model = Cliente
		fields = ('id','usuario','nombre','apellido','email','dni','telefono')

	def get_email(self,obj):
		return obj.usuario.email

	def get_nombre(self,obj):
		return obj.usuario.first_name

	def get_apellido(self,obj):
		return obj.usuario.last_name



class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model=User
		fields = ('username','password', 'first_name', 'last_name', 'email')
		write_only_fields = ('password',)

	def restore_object(self, attrs, instance=None):
		user = super(UserSerializer, self).restore_object(attrs, instance)
		user.set_password(attrs['password'])
		return user

class ComentarioImagenSerializer(serializers.ModelSerializer):
	class Meta:
		model = ComentarioImagen

from django.utils.timesince import timesince

class ComentairoSerializer(serializers.ModelSerializer):
	creado = serializers.SerializerMethodField('get_tiempo_creado')
	nombre = serializers.SerializerMethodField('get_nombre_user')
	img_producto = serializers.SerializerMethodField('get_img')
	foto = serializers.SerializerMethodField()
	recomen = serializers.SerializerMethodField()
	fotos_coment = ComentarioImagenSerializer(many=True)
	class Meta:
		model = Comentario
		fields = ('id','verificado','valoracion','titulo_comentario','comentario','creado','producto','variacion','usuario','nombre',
			'img_producto','email_invitado','recomendacion','foto','recomen','ayuda_si','ayuda_no','fotos_coment')

	def get_tiempo_creado(self,obj):
		time = timesince(obj.creado)
		return time

	def get_nombre_user(self,obj):
		nombre = 'Anonimo'
		if obj.usuario:
			nombre = obj.usuario.username 
			if obj.usuario.first_name:
				nombre = "%s %s" %(obj.usuario.first_name,obj.usuario.last_name)
		return nombre

	def get_foto(self,obj):
		try:
			cliente = Cliente.objects.get(pk=obj.usuario.pk)
			foto = cliente.foto.url
		except Exception, e:
			foto = None		
		return foto

	def get_img(self,obj):
		return obj.producto.get_thum().url

	def get_recomen(self,obj):
		if obj.recomendacion=='si':
			return True
		else:
			return False


class SuscritoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Suscrito

class MayoristaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Mayorista