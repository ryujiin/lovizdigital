# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ubigeo', '0002_auto_20151127_1406'),
        ('pedido', '0007_auto_20160111_0919'),
    ]

    operations = [
        migrations.AddField(
            model_name='metodoenvio',
            name='restricciones',
            field=models.ManyToManyField(to='ubigeo.Ubigeo', blank=True),
        ),
    ]
