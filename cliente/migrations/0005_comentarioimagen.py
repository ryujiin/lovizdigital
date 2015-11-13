# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0004_auto_20151113_1113'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComentarioImagen',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('foto', models.ImageField(max_length=250, null=True, upload_to=b'comentario', blank=True)),
                ('comentario', models.ForeignKey(blank=True, to='cliente.Comentario', null=True)),
            ],
        ),
    ]
