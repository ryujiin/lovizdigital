# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0012_auto_20151229_2237'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linkmenu',
            name='menu',
            field=models.ForeignKey(related_name='links', to='cmsweb.Menu'),
        ),
    ]
