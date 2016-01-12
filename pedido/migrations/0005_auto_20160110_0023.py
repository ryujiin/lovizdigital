# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0004_pedido_telefono_pedido'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='pago_pedido',
            field=models.OneToOneField(null=True, blank=True, to='pedido.Pago'),
        ),
    ]
