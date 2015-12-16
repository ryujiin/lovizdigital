# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0004_auto_20151215_1421'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='front',
            field=models.BooleanField(default=False),
        ),
    ]
