from django.db import models

# Create your models here.
import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from catalogo.models import *
from django.contrib.auth.models import User as User
from pedido.models import Pedido

from decimal import Decimal

class Carro(models.Model):
	ABIERTO, FUCIONADA, GUARDADA, CONGELADA, ENVIADA = (
        "Abierto", "Fusionada", "Guardado", "Congelado", "Enviado")
	ESTADO_ELECCION = (
        (ABIERTO, _("Abierto - Actualmente activa  ")),
        (FUCIONADA, _("Fusionada - sustituida por otra canasta ")),
        (GUARDADA, _("Guardado - para los articulos para comprar mas adelante ")),
        (CONGELADA, _("Congelado - la canasta no se puede modificar ")),
        (ENVIADA, _("Enviado - ha sido ordenado en la caja")),
    )
	propietario = models.ForeignKey(User,related_name='Carrito', null=True,blank=True)
	sesion_carro = models.CharField(max_length=120,blank=True,null=True)
	estado = models.CharField(max_length=128,default=ABIERTO,choices=ESTADO_ELECCION)
	date_created = models.DateTimeField(auto_now_add=True)
	date_submitted = models.DateTimeField(blank=True,null=True)
	pedido = models.OneToOneField(Pedido,blank=True,null=True,unique=True)
	
	def __unicode__(self):
		return "Carro de %s - %s" %(self.propietario,self.estado)

	def all_lineas(self):
		return LineaCarro.objects.filter(carro=self)

	def num_lineas(self):
		num = 0
		lineas = self.all_lineas()
		for linea in lineas:
			num = num+linea.cantidad
		return num

	def subtotal_carro(self):
		total = 0
		lineas = self.all_lineas()
		for linea in lineas:
			subtotal = float(linea.get_subtotal())
			total = total + subtotal
		return total

	def total_carro(self):
		subtotal = self.subtotal_carro()
		envio = self.envio_carro()
		total = subtotal + float(Decimal(envio))
		return total

	def envio_carro(self):
		envio = 0
		#if self.pedido:
		#	envio = self.pedido.gasto_envio
		return envio

	def save(self, *args, **kwargs):
		if self.propietario:
			self.sesion_carro = 'carro de %s ya no hay cookie%s' %(self.propietario,self.id)
			if not self.pedido:
				pedido = Pedido(user=self.propietario,estado_pedido='autenticado',)
				pedido.save()
				self.pedido = pedido
		super(Carro, self).save(*args, **kwargs)		
		if self.estado!='Fusionada':
			if self.propietario:
				carros = Carro.objects.filter(propietario=self.propietario,estado=self.ABIERTO).order_by('-pk')
			else:
				carros = Carro.objects.filter(sesion_carro=self.sesion_carro,estado=self.ABIERTO).order_by('-pk')
			#carros = Carro.objects.filter(Q(propietario=self.propietario) | Q(sesion_carro=self.sesion_carro)).filter(estado=self.ABIERTO).order_by('-pk')
			if carros:				
				for carro in carros:
					if self.pk != carro.pk:
						lineas = LineaCarro.objects.filter(carro=carro.pk)
						#fucionar lineas
						if lineas:
							for linea in lineas:
								linea.carro = self
								linea.save()
						carro.estado = self.FUCIONADA
						carro.save()



class LineaCarro(models.Model):
	carro = models.ForeignKey(Carro,related_name="lineas")
	producto = models.ForeignKey(Producto,blank=True,null=True)
	variacion = models.ForeignKey(ProductoVariacion,blank=True,null=True)
	cantidad = models.PositiveIntegerField(default=1)
	date_created = models.DateTimeField(auto_now_add=True)
	activo = models.BooleanField(default=True)

	def get_precio(self):
		precio = self.variacion.precio_minorista
		if self.variacion.oferta > 0:
			oferta = precio*self.variacion.oferta/100
			precio = precio-oferta
		return precio

	def get_subtotal(self):
		precio = self.get_precio()
		subtotal = precio * self.cantidad
		return subtotal

	def __unicode__(self):
		return "linea de %s con %s articulos de %s" %(self.carro.propietario,self.cantidad,self.variacion)

	def save(self, *args, **kwargs):
		if self.cantidad == 0:
			self.activo = False
		if self.carro.estado=='Abierto':			
			try:
				coincidencias = LineaCarro.objects.get(carro=self.carro,variacion=self.variacion)
			except ObjectDoesNotExist:
				super(LineaCarro, self).save(*args, **kwargs)
			else:
				if self.pk!=coincidencias.pk:
					coincidencias.delete()
					self.cantidad = coincidencias.cantidad+self.cantidad
				super(LineaCarro, self).save(*args, **kwargs)