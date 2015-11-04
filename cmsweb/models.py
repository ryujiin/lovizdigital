from django.db import models

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