# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0007_auto_20151215_1429'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloque',
            name='seccion',
            field=models.CharField(help_text=b'El id donde se colocara', max_length=100, blank=True),
        ),
    ]
