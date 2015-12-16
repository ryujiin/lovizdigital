# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0009_imagecarrusel'),
    ]

    operations = [
        migrations.CreateModel(
            name='TemplateBloque',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='bloque',
            name='page',
            field=models.ForeignKey(related_name='bloques', blank=True, to='cmsweb.Page', null=True),
        ),
        migrations.AlterField(
            model_name='imagecarrusel',
            name='bloque',
            field=models.ForeignKey(related_name='imagenes_carrusel', blank=True, to='cmsweb.Bloque'),
        ),
        migrations.AlterField(
            model_name='imagecarrusel',
            name='imagen',
            field=models.ImageField(upload_to=b'bloque/carrusel'),
        ),
        migrations.AddField(
            model_name='bloque',
            name='template',
            field=models.ForeignKey(blank=True, to='cmsweb.TemplateBloque', null=True),
        ),
    ]
