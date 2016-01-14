from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.

class Color(models.Model):
	nombre = models.CharField(max_length=100)
	hexdecimal = models.CharField(max_length=10,blank=True)	
	descripcion = models.TextField(blank=True,null=True)
	slug = models.SlugField(max_length=120,unique=True,editable=False,blank=True,null=True)

	def __unicode__(self):
		return self.nombre

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.nombre)
		super(Color, self).save(*args, **kwargs)

class Talla(models.Model):
	nombre = models.CharField(max_length=100)
	slug = models.SlugField(max_length=120,unique=True,editable=False,blank=True,null=True)
	orden = models.PositiveIntegerField(default=0)

	def __unicode__(self):
		return self.nombre

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.nombre)
		super(Talla, self).save(*args, **kwargs)

class TipoCambio(models.Model):
	fecha = models.DateField(auto_now_add=True)
	cambio = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)