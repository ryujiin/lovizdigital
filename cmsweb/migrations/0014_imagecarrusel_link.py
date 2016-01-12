# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0013_auto_20151229_2307'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagecarrusel',
            name='link',
            field=models.CharField(max_length=100, blank=True),
        ),
    ]
