# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0010_auto_20151215_2254'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloque',
            name='carrusel',
            field=models.BooleanField(default=False),
        ),
    ]
