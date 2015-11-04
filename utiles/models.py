from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.

class Color(models.Model):
	nombre = models.CharField(max_length=100)
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

	def __unicode__(self):
		return self.nombre

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.nombre)
		super(Talla, self).save(*args, **kwargs)