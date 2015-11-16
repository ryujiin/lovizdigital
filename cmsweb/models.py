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
	slug = models.SlugField(max_length=120,unique=True)
	activo = models.BooleanField(default=True)	
	cuerpo = models.TextField()

	def save(self, *args, **kwargs):
		self.full_name = "%s (%s)" %(self.nombre,self.color)
		if not self.slug:
			self.slug = slugify(self.full_name)
		super(Pages, self).save(*args, **kwargs)

