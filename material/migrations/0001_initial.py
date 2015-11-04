# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utiles', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, blank=True)),
                ('imagen', models.ImageField(null=True, upload_to=b'material/imagen/', blank=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='MaterialTipo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='PlantaPVC',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, blank=True)),
                ('tipo', models.CharField(max_length=100)),
                ('color', models.ForeignKey(to='utiles.Color')),
                ('talla', models.ForeignKey(to='utiles.Talla')),
            ],
        ),
        migrations.CreateModel(
            name='PrecioMaterial',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('precio', models.DecimalField(help_text=b'Este es el precio del material', null=True, max_digits=10, decimal_places=2, blank=True)),
                ('unidad_medida', models.CharField(blank=True, max_length=100, null=True, choices=[(b'metros', b'Metros'), (b'centimetros', b'Centimetros'), (b'unidades', b'Unidades'), (b'docenas', b'Docenas'), (b'paquetes', b'paquetes'), (b'kilos', b'Kilos')])),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('material', models.ForeignKey(to='material.Material', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Proveedor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, blank=True)),
                ('ruc', models.CharField(max_length=11, blank=True)),
                ('telefono', models.CharField(max_length=11, blank=True)),
                ('direccion', models.CharField(max_length=100, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('accion', models.CharField(blank=True, max_length=100, null=True, choices=[(b'mas', b'Aumenta'), (b'menos', b'Disminuye')])),
                ('cantidad', models.DecimalField(help_text=b'Este es la cantidad que se modifica en el stock', null=True, max_digits=10, decimal_places=2, blank=True)),
                ('stock', models.DecimalField(help_text=b'Este es el stock que hay de este material', null=True, max_digits=10, decimal_places=2, blank=True)),
                ('material', models.ForeignKey(to='material.Material')),
            ],
        ),
        migrations.AddField(
            model_name='material',
            name='proveedor',
            field=models.ForeignKey(to='material.Proveedor', blank=True),
        ),
        migrations.AddField(
            model_name='material',
            name='tipo',
            field=models.ForeignKey(to='material.MaterialTipo', blank=True),
        ),
    ]
