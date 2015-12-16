# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0005_page_front'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='cuerpo',
            field=models.TextField(blank=True),
        ),
    ]
