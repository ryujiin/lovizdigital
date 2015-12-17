# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0010_auto_20151217_0519'),
        ('carro', '0004_auto_20151208_1602'),
    ]

    operations = [
        migrations.AddField(
            model_name='carro',
            name='cupon',
            field=models.OneToOneField(null=True, blank=True, to='cliente.CuponesCliente'),
        ),
    ]
