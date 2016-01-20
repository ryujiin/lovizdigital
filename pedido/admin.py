from django.contrib import admin
from models import *
# Register your models here.

class PedidoAdmin(admin.ModelAdmin):
	list_display = ('id','__unicode__','user','fecha_compra','metodo_pago','pagado')

class PagoAdmin(admin.ModelAdmin):
	list_display = ('id','__unicode__','fecha')

class MetodoEnvioAdmin(admin.ModelAdmin):
	list_display = ('nombre','precio','grupo')

admin.site.register(Pedido,PedidoAdmin)
admin.site.register(ModificacionPedido)
admin.site.register(EstadoPedido)
admin.site.register(MetodoEnvio,MetodoEnvioAdmin)
admin.site.register(MetodoPago)
admin.site.register(Pago,PagoAdmin)