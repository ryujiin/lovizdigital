from django.contrib import admin
from models import *

# Register your models here.
class SerieTallasInline(admin.TabularInline):
	model = SerieTallas

class SerieVentaMayoristaAdmin(admin.ModelAdmin):
	inlines = [SerieTallasInline,]

class CuentaMayoristaAdmin(admin.ModelAdmin):
	list_display = ('mayorista','fecha','deuda_mes','acuenta_mes','venta_mes')

admin.site.register(VentaMayorista)
admin.site.register(SerieVentaMayorista,SerieVentaMayoristaAdmin)
admin.site.register(PagoMayorista)
admin.site.register(CuentaMayorista,CuentaMayoristaAdmin)
admin.site.register(Ingresos)