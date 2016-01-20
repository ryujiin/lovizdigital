# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0016_auto_20160112_2142'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imagecarrusel',
            options={'ordering': ['orden']},
        ),
    ]
