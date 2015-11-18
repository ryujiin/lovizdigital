# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0006_auto_20151113_1547'),
    ]

    operations = [
        migrations.AddField(
            model_name='comentario',
            name='activo',
            field=models.BooleanField(default=False),
        ),
    ]
