# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carro', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lineacarro',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
