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
	list_display = ('id','full_name','nombre','slug','activo')

class CategoriaAdmin(admin.ModelAdmin):
	list_display=('nombre','full_name','slug','nombre')

admin.site.register(Producto,ProductoAdmin)
admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(SeccionProducto)
admin.site.register(Modelo)