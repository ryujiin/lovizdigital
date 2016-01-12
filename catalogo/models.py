from django.db import models
from django.template.defaultfilters import slugify

from sorl.thumbnail import get_thumbnail
from django.contrib.auth.models import User as User
from utiles.models import Color,Talla
from material.models import Material,PrecioMaterial

# Create your models here.
class Producto(models.Model):
	nombre = models.CharField(max_length=120,blank=True,null=True)
	full_name = models.CharField(max_length=120, unique=True,blank=True,null=True,editable=False)
	slug = models.CharField(max_length=120,editable=False,unique=True)
	color = models.ForeignKey(Color,blank=True,null=True)
	relaciones = models.ManyToManyField('self',blank=True, related_name='colores')
	categorias = models.ManyToManyField('Categoria',blank=True,related_name='categorias_producto')
	activo = models.BooleanField(default=True)
	descripcion = models.TextField(blank=True,null=True)
	detalles = models.TextField(blank=True,null=True)
	creado = models.DateTimeField(auto_now_add=True)
	actualizado = models.DateTimeField(auto_now=True)
	is_ofert = models.BooleanField(default=False)
	is_nuevo = models.BooleanField(default=False)
	video = models.CharField(max_length=120, blank=True,null=True)

	def __unicode__(self):
		return self.full_name

	def save(self, *args, **kwargs):
		self.full_name = "%s (%s)" %(self.nombre,self.color)
		if not self.slug:
			self.slug = slugify(self.full_name)
		super(Producto, self).save(*args, **kwargs)

	def get_thum(self):
		img = ProductoImagen.objects.filter(producto=self).order_by('pk')[0]
		img = get_thumbnail(img.foto, '450x350', quality=80)
		return img

	def guardar_oferta(self):
		oferta = self.get_en_oferta()
		if oferta>0:
			self.is_ofert = True
		else:
			self.is_ofert = False
		self.save()

	def get_en_oferta(self):
		variaciones = self.get_variaciones()
		return variaciones[0].oferta

	def get_variaciones(self):
		variaciones = ProductoVariacion.objects.filter(producto=self).order_by('-oferta')
		return variaciones

	def get_precio_lista(self):
		en_oferta = self.get_en_oferta()
		if en_oferta:
			variaciones=self.get_variaciones()
		else:
			variaciones = ProductoVariacion.objects.filter(producto=self).order_by('-precio_minorista')
		if variaciones:
			precio = variaciones[0].precio_minorista
		else:
			precio = 0
		if not precio:
			precio =0
		#precio = "%0.2f" %(precio)		
		return precio

	def get_precio_oferta_lista(self):
		en_oferta = self.get_en_oferta()
		if en_oferta:
			variaciones=self.get_variaciones()
			precio_oferta = variaciones[0].precio_oferta
			return precio_oferta
		else:
			precio = self.get_precio_lista()
			return precio

	def get_parientes(self):
		parientes = self.parientes.all()
		return parientes

	def get_num_estrellas(self):
		num_entrellas = Comentario.objects.filter(producto=self)
		return num_entrellas

class Categoria(models.Model):
	SECCIONES = (
		('genero','Genero'),
		('categoria','Categoria'),
		('estilo','Estilo'),
	)
	nombre = models.CharField(max_length=120)
	full_name = models.CharField(max_length=255,db_index=True, editable=False)
	padre = models.ForeignKey('self',blank=True,null=True)
	seccion = models.CharField(max_length=100,choices=SECCIONES,blank=True,null=True)
	slug = models.SlugField(max_length=120,unique=True,editable=False)
	titulo_seo = models.CharField(max_length=100,blank=True,null=True)	
	descripcion = models.TextField(blank=True,null=True)
	activo = models.BooleanField(default=True)
	imagen = models.ImageField(upload_to='categorias',blank=True,null=True,max_length=250)

	def __unicode__(self):
		return self.slug

	def save(self, *args, **kwargs):
		if self.padre:
			self.full_name = "%s - %s" %(self.nombre, self.padre.full_name)
		else:
			self.full_name = self.nombre
		if not self.slug:
			self.slug = slugify(self.full_name)
		super(Categoria, self).save(*args, **kwargs)

class ProductoVariacion(models.Model):
	producto = models.ForeignKey(Producto,related_name='variaciones')
	talla = models.ForeignKey(Talla)
	precio_minorista = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	oferta = models.PositiveIntegerField(default=0)
	precio_oferta = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	stock = models.PositiveIntegerField(default=0)

	def __unicode__(self):
		return "%s - %s" %(self.producto,self.precio_minorista)

	def get_precio_venta(self):
		descuento= self.precio_minorista*self.oferta/100
		precio = self.precio_minorista - descuento
		return precio

	def save(self, *args, **kwargs):
		if self.precio_oferta:
			porcentaje = self.precio_oferta*100/self.precio_minorista
			self.oferta = 100-int(porcentaje)
		super(ProductoVariacion, self).save(*args, **kwargs)

def url_imagen_pr(self,filename):
	url = "productos/imagen/%s/%s" % (self.producto.pk, filename)
	return url

class ProductoImagen(models.Model):
	producto = models.ForeignKey(Producto,related_name="imagenes_producto")
	foto = models.ImageField(upload_to=url_imagen_pr)
	orden = models.PositiveIntegerField(default=0)
	creado = models.DateTimeField(auto_now_add=True)
	actualizado = models.DateTimeField(auto_now=True)
	class Meta:
		ordering = ["orden"]

	def get_thum_medium(self):
		img = get_thumbnail(self.foto, '740x600', quality=80)
		return img

	def get_thum(self):
		img = get_thumbnail(self.foto, '150x100', quality=80)
		return img

class MaterialProducto(models.Model):
	producto = models.ForeignKey(Producto,blank=True, related_name='material_producto')
	material = models.ForeignKey(Material,blank=True)
	cantidad = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text='La cantidad usada en este producto de este material')
	costo = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	seccion = models.ForeignKey('SeccionProducto',blank=True)
	descripcion = models.CharField(max_length=300,blank=True)

	def save(self, *args, **kwargs):
		if not self.costo:
			precio = PrecioMaterial.objects.filter(material=self.material).order_by('pk')[0]
			self.costo = precio.precio/self.cantidad
		super(MaterialProducto, self).save(*args, **kwargs)

class SeccionProducto(models.Model):
	nombre = models.CharField(max_length=100)
	modelo = models.ForeignKey('Modelo',blank=True)

	def __unicode__(self):
		return self.nombre

class Modelo(models.Model):
	nombre = models.CharField(max_length=100)
	descripcion = models.TextField(blank=True)

	def __unicode__(self):
		return self.nombre
