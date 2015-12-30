# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('material', '0002_auto_20151007_2004'),
    ]

    operations = [
        migrations.AddField(
            model_name='preciomaterial',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
