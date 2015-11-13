from django.db import models
from cliente.models import Mayorista
from catalogo.models import Producto,ProductoVariacion
from utiles.models import Talla

# Create your models here.

class VentaMayorista(models.Model):
	mayorista = models.ForeignKey(Mayorista, related_name='Cliente_mayorista',blank=True)
	fecha = models.DateField()
	producto = models.ForeignKey(Producto,blank=True)
	cantidad_docenas = models.DecimalField(max_digits=10,decimal_places=1,null=True,blank=True)
	serie = models.ForeignKey('SerieVentaMayorista')

class SerieVentaMayorista(models.Model):
	nombre = models.CharField(max_length=100)
	mayorista = models.ForeignKey(Mayorista,blank=True)
	fecha_creacion = models.DateField()
	precio = models.DecimalField(max_digits=10,decimal_places=1,null=True,blank=True)

	def __unicode__(self):
		return "%s de %s - S/.%s" %(self.nombre,self.mayorista,self.precio)

class SerieTallas(models.Model):
	serie_venta = models.ForeignKey('SerieVentaMayorista', related_name='Tallas')
	talla = models.ForeignKey(Talla)
	cantidad = models.PositiveIntegerField(default=0)

class PagoMayorista(models.Model):
	mayorista = models.ForeignKey(Mayorista)
	fecha = models.DateField()
	monto = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)

	def __unicode__(self):
		return "%s pago S/.%s el %s" %(self.mayorista,self.monto,self.fecha)

class CuentaMayorista(models.Model):
	mayorista = models.ForeignKey(Mayorista)
	fecha = models.DateField()
	deuda_mes = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	acuenta_mes = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	venta_mes = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)

class Ingresos(models.Model):
	fecha = models.DateTimeField()
	monto = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text='La cantidad de dinero que ingreso')
	