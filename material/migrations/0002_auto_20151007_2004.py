# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('material', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='material',
            field=models.ForeignKey(to='material.Material', blank=True),
        ),
    ]
