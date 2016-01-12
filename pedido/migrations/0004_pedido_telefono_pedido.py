# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0003_pago_transaccion'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='telefono_pedido',
            field=models.CharField(max_length=100, blank=True),
        ),
    ]
