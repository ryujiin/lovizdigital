from django.db import models
from django.contrib.auth.models import User as User
from catalogo.models import Producto,ProductoVariacion
from ubigeo.models import *

# Create your models here.
class Cliente(models.Model):
	GENEROS = (('Hombre','hombre'),('Mujer','mujer'),)
	usuario = models.OneToOneField(User,related_name='cliente', null=True,blank=True,unique=True)
	foto = models.ImageField(upload_to='perfiles',blank=True,null=True,max_length=250)
	genero = models.CharField(max_length=100,blank=True,null=True,choices=GENEROS)
	dni = models.CharField(max_length=10,blank=True,null=True)
	telefono = models.CharField(max_length=11,blank=True,null=True)

class CuponesCliente(models.Model):
	cliente =models.ForeignKey('Cliente')
	cupon = models.ForeignKey('CuponesDescuentos')
	fecha_creacion = models.DateTimeField(auto_now_add=True)
	fecha_uso = models.DateTimeField(blank=True,null=True)

class CuponesDescuentos(models.Model):
	nombre = models.CharField(max_length=100,help_text='El nombre del Cupon, Ejemplo: 2x1')
	porcentaje_descuento = models.PositiveIntegerField(default=0)
	dias_duracion = models.PositiveIntegerField(default=0)
	activo = models.BooleanField(default=True)
	fecha_creacion =models.DateTimeField(auto_now_add=True)
    
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
	producto = models.ForeignKey(Producto,blank=True,null=True)
	activo = models.BooleanField(default=False)
	variacion = models.ForeignKey(ProductoVariacion,blank=True,null=True)
	usuario = models.ForeignKey(User, null=True,blank=True)
	verificado = models.BooleanField(default=False)
	valoracion = models.PositiveIntegerField(default=0)
	titulo_comentario = models.CharField(max_length=100,blank=True,null=True)
	comentario = models.TextField(blank=True)
	creado = models.DateTimeField(auto_now_add=True)
	email_invitado = models.CharField(max_length=100,blank=True,null=True)
	recomendacion = models.CharField(max_length=10,blank=True,null=True,choices=TIPO)
	ayuda_si = models.PositiveIntegerField(default=0)
	ayuda_no = models.PositiveIntegerField(default=0)

	def get_usuario_id(self):
		if self.usuario:
			return self.usuario.pk

class ComentarioImagen(models.Model):
	comentario = models.ForeignKey(Comentario,blank=True,null=True,related_name='fotos_coment')
	foto = models.ImageField(upload_to='comentario',blank=True,null=True,max_length=250)    

import sendgrid
from django.conf import settings

class Suscrito(models.Model):
	email = models.CharField(max_length=100,blank=True,null=True)
	suscrito = models.BooleanField(default=True)
	usuario = models.BooleanField(default=True)
	cliente = models.ForeignKey(Cliente,blank=True,null=True)
	user = models.ForeignKey(User,blank=True,null=True)
	activo = models.BooleanField(default=True)

	def save(self, *args, **kwargs):
		super(Suscrito, self).save(*args, **kwargs)
		sg = sendgrid.SendGridClient(settings.SENDGRID_API_KEY)
		message = sendgrid.Mail()
		message.add_to(self.email)
		message.set_subject('Bienvenida a Loviz DelCarpio. Descuento para tu proxima compra')		
		message.set_text('1')
		message.set_html('2')
		message.set_from('Luis Lopez <luis_lopez@lovizdc.com>')

		message.add_filter('templates', 'enable', '1')
		message.add_filter('templates', 'template_id', '8b156242-0ca1-4f8f-a124-816297cbb2c1')

		status, msg = sg.send(message)


class Favorito(models.Model):
	usuario = models.OneToOneField(User,null=True,blank=True,unique=True)
	producto = models.ForeignKey(Producto,blank=True,null=True,related_name='catalogo')
	date = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return "%s - %s" %(self.usuario,self.producto)

class Mayorista(models.Model):
	nombre = models.CharField(max_length=100)
	ruc = models.CharField(max_length=11,blank=True)
	direccion = models.CharField(max_length=40,blank=True)

	def __unicode__(self):
		return self.nombre