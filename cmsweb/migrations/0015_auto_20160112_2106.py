# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0014_imagecarrusel_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='paginas',
            field=models.ManyToManyField(related_name='menus', to='cmsweb.Page', blank=True),
        ),
    ]
