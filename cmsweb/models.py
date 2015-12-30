from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.


def url_imagen_pr(self,filename):
	url = "carrusel/imagen/%s" % (filename)
	return url

class Carrusel(models.Model):
	titulo = models.CharField(max_length=100,blank=True)
	foto = models.ImageField(upload_to=url_imagen_pr)
	seccion = models.ForeignKey('SeccionesCMS',blank=True)
	creado = models.DateTimeField(auto_now_add=True)
	activo = models.BooleanField(default=True)

class SeccionesCMS(models.Model):
	titulo = models.CharField(max_length=100,blank=True)
	activo = models.BooleanField(default=True)

	def __unicode__(self):
		return self.titulo

class Page(models.Model):
	titulo = models.CharField(max_length=100,help_text='El titulo de la pagina web')
	descripcion = models.CharField(max_length=150,help_text='La descripcion que se vera en la pagina para el buscador')
	titulo_activo = models.BooleanField(default=True)
	front = models.BooleanField(default=False)
	slug = models.SlugField(max_length=120,unique=True,blank=True)
	activo = models.BooleanField(default=True)	
	cuerpo = models.TextField(blank=True)

	def __unicode__(self):
		return self.slug

class TemplateBloque(models.Model):
	nombre=models.CharField(max_length=100,blank=True)

	def __unicode__(self):
		return self.nombre
    

class Bloque(models.Model):
	titulo = models.CharField(max_length=100,blank=True,help_text='El titulo de la pagina web')
	page = models.ForeignKey(Page,blank=True,null=True,related_name='bloques')
	estilo = models.CharField(max_length=100,blank=True)
	cuerpo = models.TextField(blank=True)
	seccion = models.CharField(max_length=100,blank=True,help_text='El id donde se colocara')
	template = models.ForeignKey(TemplateBloque,blank=True,null=True)
	carrusel = models.BooleanField(default=False)

	def __unicode__(self):
		return "%s de %s " %(self.titulo,self.page)

    
class ImageCarrusel(models.Model):
	titulo = models.CharField(max_length=100,blank=True,help_text='Titulo que tendra la imagen en el Alt')
	estilo = models.CharField(max_length=100,blank=True)
	bloque = models.ForeignKey(Bloque,blank=True,related_name='imagenes_carrusel')
	orden = models.PositiveIntegerField(default=0)
	imagen = models.ImageField(upload_to='bloque/carrusel')

class Menu(models.Model):
	titulo = models.CharField(max_length=100,blank=True)
	estilo = models.CharField(max_length=100,blank=True)
	seccion = models.CharField(max_length=100,blank=True,help_text='El id donde se colocara')
	paginas = models.ManyToManyField(Page,blank=True)
	activo = models.BooleanField(default=True)

	def __unicode__(self):
		return self.titulo

class LinkMenu(models.Model):
	nombre = models.CharField(max_length=100,blank=True)
	menu = models.ForeignKey(Menu, related_name='links')
	icono = models.CharField(max_length=100,blank=True)
	link = models.CharField(max_length=100,blank=True)
	estilo = models.CharField(max_length=100,blank=True)

