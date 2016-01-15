# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0014_auto_20160114_1707'),
    ]

    operations = [
        migrations.AddField(
            model_name='cupondescuento',
            name='slug',
            field=models.CharField(unique=True, max_length=100, blank=True),
        ),
    ]
