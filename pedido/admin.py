from django.contrib import admin
from models import *
# Register your models here.

class PedidoAdmin(admin.ModelAdmin):
	list_display = ('id','__unicode__','user','fecha_compra','metodo_pago')

admin.site.register(Pedido,PedidoAdmin)
admin.site.register(ModificacionPedido)
admin.site.register(EstadoPedido)
admin.site.register(MetodoEnvio)
admin.site.register(MetodoPago)
admin.site.register(Pago)