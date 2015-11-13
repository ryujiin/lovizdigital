# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0003_cliente_foto'),
    ]

    operations = [
        migrations.AddField(
            model_name='comentario',
            name='ayuda_no',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='comentario',
            name='ayuda_si',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
