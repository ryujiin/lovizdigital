from rest_framework import serializers
from models import *

from cliente.models import Comentario


class CategoriaSerializer(serializers.ModelSerializer):
	padre = serializers.CharField(read_only=True)
	link  = serializers.SerializerMethodField()
	imagen = serializers.SerializerMethodField()
	class Meta:
		model = Categoria
		fields = ('id','nombre','full_name','seccion','slug','descripcion','activo','imagen','padre','link','titulo_seo')

	def get_link(self,obj):
		link = '/catalogo/%s/' %obj.slug
		return link

	def get_imagen(self,obj):
		if obj.imagen:
			return obj.imagen.url
		else:
			return None

class ProductoVariacionSerializer(serializers.ModelSerializer):
	talla = serializers.CharField(read_only=True)
	precio_venta = serializers.SerializerMethodField('get_precio')
	precio = serializers.SerializerMethodField('get_precio_minorista')
	stock = serializers.SerializerMethodField()
	class Meta:
		model=ProductoVariacion
		fields =('id','talla','precio','oferta','precio_venta','stock')

	def get_precio(self,obj):
		precio = obj.precio_oferta
		if precio:
			precio ="%0.2f" %(precio)
		return precio
		
	def get_precio_minorista(self,obj):
		precio = obj.precio_minorista
		precio ="%0.2f" %(precio)
		return precio

	def get_stock(self,obj):
		stock = obj.stock
		if stock == 0:
			stock = None
		return stock


class ParienteSerialiezer(serializers.ModelSerializer):
	thum = serializers.SerializerMethodField('get_img_thum')
	class Meta:
		model = Producto
		fields = ('id','nombre','full_name','thum','slug')

	def get_img_thum(self,obj):
		img = obj.get_thum().url
		return img


class ImgProductoSerializer(serializers.ModelSerializer):
	imagen = serializers.SerializerMethodField()
	imagen_medium = serializers.SerializerMethodField()
	imagen_thum = serializers.SerializerMethodField()
	class Meta:
		model = ProductoImagen
		fields =('imagen','imagen_medium','imagen_thum','orden')
	
	def get_imagen(self,obj):
		return obj.foto.url

	def get_imagen_medium(self,obj):
		url = obj.get_thum_medium().url
		return url

	def get_imagen_thum(self,obj):
		url = obj.get_thum().url
		return url

class MaterialProductoSerializer(serializers.ModelSerializer):
	material = serializers.CharField(read_only=True)
	class Meta:
		model = MaterialProducto
		fields = ('material','descripcion')

class ProductoSingleSereializer(serializers.ModelSerializer):
	color= serializers.CharField(read_only=True)
	variaciones = ProductoVariacionSerializer(many=True)
	material_producto = MaterialProductoSerializer(many=True)
	imagenes_producto = ImgProductoSerializer(many=True)
	thum = serializers.SerializerMethodField('get_thum_img')
	link = serializers.SerializerMethodField()
	relaciones = ParienteSerialiezer(many=True)

	precio = serializers.SerializerMethodField('get_precio_lista')
	precio_venta = serializers.SerializerMethodField('get_precio_descuento')
	oferta = serializers.SerializerMethodField()

	valoracion = serializers.SerializerMethodField()
	num_comentarios=serializers.SerializerMethodField()
	categorias = CategoriaSerializer(many=True)

	nuevo = serializers.SerializerMethodField()

	class Meta:
		model = Producto
		fields = ('id','nombre','full_name','color','slug','activo','descripcion','thum','link',
				'oferta','precio','precio_venta','nuevo',
				'imagenes_producto','variaciones','relaciones','video','detalles','valoracion','num_comentarios','categorias','material_producto')

	def get_nuevo(self,obj):
		nuevo = obj.guardar_novedad()
		return nuevo
		
	def get_thum_img(self,obj):
		thum = obj.get_thum().url
		return thum

	def get_oferta(self,obj):
		obj.guardar_oferta()
		return obj.get_en_oferta()

	def get_link(self,obj):
		link = '/producto/%s/' %obj.slug
		return link

	def get_precio_lista(self,obj):
		precio = obj.get_precio_lista()
		precio ="%0.2f" %(precio)
		return precio

	def get_precio_descuento(self,obj):
		precio= obj.get_precio_oferta_lista()
		precio ="%0.2f" %(precio)		
		return precio

	def get_valoracion(self,obj):
		valoraciones = Comentario.objects.filter(producto=obj.id)
		num = Comentario.objects.filter(producto=obj.id).count()
		valor = 0.0
		valoracion = 0
		for varia in valoraciones:
			valor = valor+varia.valoracion
		if num!=0:
			valoracion = valor/num
		valoracion ="%0.1f" %(valoracion)

		return valoracion

	def get_num_comentarios(self,obj):
		return Comentario.objects.filter(producto=obj.id).count()

