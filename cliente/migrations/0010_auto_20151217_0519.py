# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0009_auto_20151117_2109'),
    ]

    operations = [
        migrations.CreateModel(
            name='CuponesCliente',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_uso', models.DateTimeField(null=True, blank=True)),
                ('cliente', models.ForeignKey(to='cliente.Cliente')),
            ],
        ),
        migrations.CreateModel(
            name='CuponesDescuentos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(help_text=b'El nombre del Cupon, Ejemplo: 2x1', max_length=100)),
                ('porcentaje_descuento', models.PositiveIntegerField(default=0)),
                ('dias_duracion', models.PositiveIntegerField(default=0)),
                ('activo', models.BooleanField(default=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='cuponescliente',
            name='cupon',
            field=models.ForeignKey(to='cliente.CuponesDescuentos'),
        ),
    ]
