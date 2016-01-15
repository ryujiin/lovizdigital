from django.contrib import admin
from models import *

# Register your models here.

class ProductoImagenInline(admin.TabularInline):
	model = ProductoImagen

class VariacionInline(admin.TabularInline):
	model = ProductoVariacion

class MaterialInline(admin.TabularInline):
	model = MaterialProducto

class ProductoAdmin(admin.ModelAdmin):
	inlines = [ProductoImagenInline,VariacionInline,MaterialInline,]
	filter_horizontal = ('relaciones','categorias')
	list_display = ('id','foto_producto','full_name','nombre','slug','activo','creado','actualizado','guardar_novedad')

	def foto_producto(self, obj):
		url = obj.get_thum().url
		tag = '<img src="%s" width="50">' % url
		return tag
	foto_producto.allow_tags = True



class CategoriaAdmin(admin.ModelAdmin):
	list_display=('nombre','full_name','slug','nombre')

admin.site.register(Producto,ProductoAdmin)
admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(SeccionProducto)
admin.site.register(Modelo)