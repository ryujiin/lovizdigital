# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0008_auto_20151117_2054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentario',
            name='producto',
            field=models.ForeignKey(blank=True, to='catalogo.Producto', null=True),
        ),
    ]
