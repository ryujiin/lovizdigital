from django.db import models
from utiles.models import Talla,Color
# Create your models here.

class Material(models.Model):
	nombre = models.CharField(max_length=100,blank=True)
	imagen = models.ImageField(upload_to='material/imagen/',blank=True,null=True)
	proveedor = models.ForeignKey('Proveedor',blank=True)
	tipo = models.ForeignKey('MaterialTipo',blank=True)
	creado = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.nombre

class PrecioMaterial(models.Model):
	UNIDADES = (
		('metros','Metros'),
		('centimetros','Centimetros'),
		('unidades','Unidades'),
		('docenas','Docenas'),
		('paquetes','paquetes'),
		('kilos','Kilos'),
	)
	material = models.ForeignKey(Material,blank=True)
	precio = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text='Este es el precio del material')
	unidad_medida = models.CharField(max_length=100,choices=UNIDADES,blank=True,null=True)
	fecha = models.DateTimeField(auto_now_add=True)
	activo = models.BooleanField(default=True)
   
class Stock(models.Model):
	ACCION = (
		('mas','Aumenta'),
		('menos','Disminuye'),
	)
	material =models.ForeignKey(Material,blank=True)
	accion = models.CharField(max_length=100,choices=ACCION,blank=True,null=True)
	cantidad = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text='Este es la cantidad que se modifica en el stock')
	stock = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text='Este es el stock que hay de este material')

class MaterialTipo(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.TextField(blank=True)

	def __unicode__(self):
		return self.nombre

class Proveedor(models.Model):
	nombre = models.CharField(max_length=100,blank=True)
	ruc = models.CharField(max_length=11,blank=True)
	telefono = models.CharField(max_length=11,blank=True)
	direccion = models.CharField(max_length=100,blank=True)

	def __unicode__(self):
		return self.nombre

class PlantaPVC(models.Model):
	nombre = models.CharField(max_length=100,blank=True)
	talla = models.ForeignKey(Talla)
	color = models.ForeignKey(Color)
	tipo = models.CharField(max_length=100)
