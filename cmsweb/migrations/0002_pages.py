# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pages',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(help_text=b'El titulo de la pagina web', max_length=100)),
                ('descripcion', models.CharField(help_text=b'La descripcion que se vera en la pagina para el buscador', max_length=150)),
                ('slug', models.SlugField(unique=True, max_length=120)),
                ('activo', models.BooleanField(default=True)),
                ('cuerpo', models.TextField()),
            ],
        ),
    ]
