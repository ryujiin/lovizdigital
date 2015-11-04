# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import cmsweb.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Carrusel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=100, blank=True)),
                ('foto', models.ImageField(upload_to=cmsweb.models.url_imagen_pr)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('activo', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='SeccionesCMS',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=100, blank=True)),
                ('activo', models.BooleanField(default=True)),
            ],
        ),
        migrations.AddField(
            model_name='carrusel',
            name='seccion',
            field=models.ForeignKey(to='cmsweb.SeccionesCMS', blank=True),
        ),
    ]
