# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad', '0002_auto_20151109_1927'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serieventamayorista',
            name='venta',
            field=models.ForeignKey(related_name='venta_mayorista', to='contabilidad.VentaMayorista'),
        ),
    ]
