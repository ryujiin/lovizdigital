# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0002_auto_20151119_0430'),
    ]

    operations = [
        migrations.AddField(
            model_name='pago',
            name='transaccion',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
    ]
