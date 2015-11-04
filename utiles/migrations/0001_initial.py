# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(null=True, blank=True)),
                ('slug', models.SlugField(null=True, editable=False, max_length=120, blank=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Talla',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('slug', models.SlugField(null=True, editable=False, max_length=120, blank=True, unique=True)),
            ],
        ),
    ]
