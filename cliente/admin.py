from django.contrib import admin
from models import *

class ComentarioAdmin(admin.ModelAdmin):
	list_display = ('id','usuario','creado','producto','valoracion')

class DireccionAdmin(admin.ModelAdmin):
	list_display = ('id','usuario','departamento','provincia','distrito','direccion')

class SuscritoAdmin(admin.ModelAdmin):
	list_display = ('id', 'email','activo')

class CuponDescuentoAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'slug','porcentaje_descuento')

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Direccion,DireccionAdmin)
admin.site.register(Comentario,ComentarioAdmin)
admin.site.register(Favorito)
admin.site.register(Mayorista)
admin.site.register(Suscrito,SuscritoAdmin)
admin.site.register(CuponDescuento,CuponDescuentoAdmin)
