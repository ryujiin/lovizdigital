from django.db import models
from django.contrib.auth.models import User as User
from catalogo.models import Producto,ProductoVariacion
from ubigeo.models import *

# Create your models here.
class Cliente(models.Model):
	GENEROS = (('Hombre','hombre'),('Mujer','mujer'),)
	usuario = models.OneToOneField(User,related_name='cliente', null=True,blank=True,unique=True)
	genero = models.CharField(max_length=100,blank=True,null=True,choices=GENEROS)
	dni = models.CharField(max_length=10,blank=True,null=True)
	telefono = models.CharField(max_length=11,blank=True,null=True)
    
class Direccion(models.Model):
	TIPO = (('envio','Direccion de envio'),('facturacion','Direccion de Facturacion'))
	nombre = models.CharField(max_length=100,blank=True,null=True)
	usuario = models.ForeignKey(User,related_name='direcciones', null=True,blank=True)
	tipo = models.CharField(max_length=100,blank=True,null=True,choices=TIPO)
	departamento = models.CharField(max_length=100,blank=True,null=True)
	provincia = models.CharField(max_length=100,blank=True,null=True)
	distrito = models.CharField(max_length=100,blank=True,null=True)
	direccion = models.CharField(max_length=100,blank=True,null=True)
	ubigeo = models.ForeignKey(Ubigeo,max_length=100,blank=True,null=True,related_name='direccion')
	referencia = models.CharField(max_length=200,blank=True,null=True)
	codigo_postal = models.CharField(max_length=20,blank=True,null=True)
	telefono = models.CharField(max_length=11,blank=True,null=True)

class Comentario(models.Model):
	TIPO = (('si','si'),('no','no'))	
	producto = models.ForeignKey(Producto)
	variacion = models.ForeignKey(ProductoVariacion,blank=True,null=True)
	usuario = models.ForeignKey(User, null=True,blank=True)
	verificado = models.BooleanField(default=False)
	valoracion = models.PositiveIntegerField(default=0)
	titulo_comentario = models.CharField(max_length=100,blank=True,null=True)
	comentario = models.TextField()
	creado = models.DateTimeField(auto_now_add=True)
	email_invitado = models.CharField(max_length=100,blank=True,null=True)
	recomendacion = models.CharField(max_length=10,blank=True,null=True,choices=TIPO)

	def get_usuario_id(self):
		if self.usuario:
			return self.usuario.pk

class Suscrito(models.Model):
	email = models.CharField(max_length=100,blank=True,null=True)
	suscrito = models.BooleanField(default=True)
	usuario = models.BooleanField(default=True)
	cliente = models.ForeignKey(Cliente,blank=True,null=True)
	user = models.ForeignKey(User,blank=True,null=True)

class Favorito(models.Model):
	usuario = models.OneToOneField(User,null=True,blank=True,unique=True)
	producto = models.ForeignKey(Producto,blank=True,null=True,related_name='catalogo')
	date = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return "%s - %s" %(self.usuario,self.producto)
