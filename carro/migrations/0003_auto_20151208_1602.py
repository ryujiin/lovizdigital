# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carro', '0002_lineacarro_activo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carro',
            name='pedido',
            field=models.ForeignKey(null=True, blank=True, to='pedido.Pedido', unique=True),
        ),
    ]
