# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0015_auto_20160112_2106'),
    ]

    operations = [
        migrations.AddField(
            model_name='linkmenu',
            name='orden',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='menu',
            name='template',
            field=models.CharField(max_length=100, blank=True),
        ),
    ]
