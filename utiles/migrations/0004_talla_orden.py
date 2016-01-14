# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utiles', '0003_color_hexdecimal'),
    ]

    operations = [
        migrations.AddField(
            model_name='talla',
            name='orden',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
