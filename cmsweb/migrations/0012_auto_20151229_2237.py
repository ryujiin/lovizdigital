# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0011_bloque_carrusel'),
    ]

    operations = [
        migrations.CreateModel(
            name='LinkMenu',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, blank=True)),
                ('icono', models.CharField(max_length=100, blank=True)),
                ('link', models.CharField(max_length=100, blank=True)),
                ('estilo', models.CharField(max_length=100, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=100, blank=True)),
                ('estilo', models.CharField(max_length=100, blank=True)),
                ('seccion', models.CharField(help_text=b'El id donde se colocara', max_length=100, blank=True)),
                ('activo', models.BooleanField(default=True)),
                ('paginas', models.ManyToManyField(to='cmsweb.Page', blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='linkmenu',
            name='menu',
            field=models.ForeignKey(to='cmsweb.Menu'),
        ),
    ]
