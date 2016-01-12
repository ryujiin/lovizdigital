# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0003_auto_20160112_1008'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='actualizado',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 12, 15, 27, 47, 670574, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
