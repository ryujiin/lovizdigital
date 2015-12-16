# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0008_bloque_seccion'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageCarrusel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(help_text=b'Titulo que tendra la imagen en el Alt', max_length=100, blank=True)),
                ('estilo', models.CharField(max_length=100, blank=True)),
                ('orden', models.PositiveIntegerField(default=0)),
                ('imagen', models.ImageField(upload_to=b'/bloque/carrusel/')),
                ('bloque', models.ForeignKey(to='cmsweb.Bloque', blank=True)),
            ],
        ),
    ]
