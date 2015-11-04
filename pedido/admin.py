from django.contrib import admin
from models import *
# Register your models here.

admin.site.register(Pedido)
admin.site.register(ModificacionPedido)
admin.site.register(EstadoPedido)
admin.site.register(MetodoEnvio)
admin.site.register(MetodoPago)
admin.site.register(Pago)