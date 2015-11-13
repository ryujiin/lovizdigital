# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0005_comentarioimagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentarioimagen',
            name='comentario',
            field=models.ForeignKey(related_name='fotos_coment', blank=True, to='cliente.Comentario', null=True),
        ),
    ]
