from django.contrib import admin
from models import *
# Register your models here.
class MateriaPreciolInline(admin.TabularInline):
	model = PrecioMaterial

class MaterialAdmin(admin.ModelAdmin):
	inlines = [MateriaPreciolInline,]

admin.site.register(Material,MaterialAdmin)
admin.site.register(Proveedor)
admin.site.register(PlantaPVC)
admin.site.register(MaterialTipo)