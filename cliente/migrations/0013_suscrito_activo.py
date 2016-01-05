# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0012_delete_suscriptores'),
    ]

    operations = [
        migrations.AddField(
            model_name='suscrito',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
