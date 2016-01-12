# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0005_auto_20160110_0023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='estado_pedido',
            field=models.CharField(default=b'autenticado', max_length=120, choices=[(b'autenticado', 'Autenticado - El usuario se encuentra autenticado y el pedido le pertenece'), (b'metodo_envio', 'Metodo de Envio - Ya coloco el metodo de envio, esperando metodo de pago'), (b'metodo_pago', 'Metodo de Pago - Ya selecciono el metodo de pago'), (b'esperando_pago', 'Metodo de Pago - Ya selecciono el metodo de pago, pero aun esta esperandose el pago'), (b'pagado', 'Pagado - El pago se realizo correctamente, espere el envio del producto'), (b'error_pago', 'Error en Pago - Ocurrio un error al pagar'), (b'enviado', 'Enviado - El producto fue enviado'), (b'devuelto', 'Devuelto - El producto fue devuelto')]),
        ),
    ]
