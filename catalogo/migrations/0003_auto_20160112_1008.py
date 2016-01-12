# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0002_categoria_titulo_seo'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='is_nuevo',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='producto',
            name='is_ofert',
            field=models.BooleanField(default=False),
        ),
    ]
