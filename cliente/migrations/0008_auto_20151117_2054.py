# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0007_comentario_activo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentario',
            name='comentario',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='comentario',
            name='producto',
            field=models.ForeignKey(to='catalogo.Producto', blank=True),
        ),
    ]
