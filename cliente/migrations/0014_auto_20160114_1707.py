# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0013_suscrito_activo'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CuponesDescuentos',
            new_name='CuponDescuento',
        ),
    ]
