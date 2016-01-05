# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0010_auto_20151217_0519'),
    ]

    operations = [
        migrations.CreateModel(
            name='Suscriptores',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('email', models.EmailField(max_length=244, blank=True)),
                ('activo', models.BooleanField(default=True)),
            ],
        ),
    ]
