# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carro', '0003_auto_20151208_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carro',
            name='pedido',
            field=models.OneToOneField(null=True, blank=True, to='pedido.Pedido'),
        ),
    ]
