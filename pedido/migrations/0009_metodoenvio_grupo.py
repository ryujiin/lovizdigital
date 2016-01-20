# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0008_metodoenvio_restricciones'),
    ]

    operations = [
        migrations.AddField(
            model_name='metodoenvio',
            name='grupo',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
