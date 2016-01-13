# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utiles', '0002_tipocambio'),
    ]

    operations = [
        migrations.AddField(
            model_name='color',
            name='hexdecimal',
            field=models.CharField(max_length=10, blank=True),
        ),
    ]
