# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import catalogo.models


class Migration(migrations.Migration):

    dependencies = [
        ('utiles', '__first__'),
        ('material', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=120)),
                ('full_name', models.CharField(max_length=255, editable=False, db_index=True)),
                ('seccion', models.CharField(blank=True, max_length=100, null=True, choices=[(b'genero', b'Genero'), (b'categoria', b'Categoria'), (b'estilo', b'Estilo')])),
                ('slug', models.SlugField(unique=True, max_length=120, editable=False)),
                ('descripcion', models.TextField(null=True, blank=True)),
                ('activo', models.BooleanField(default=True)),
                ('imagen', models.ImageField(max_length=250, null=True, upload_to=b'categorias', blank=True)),
                ('padre', models.ForeignKey(blank=True, to='catalogo.Categoria', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MaterialProducto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.DecimalField(help_text=b'La cantidad usada en este producto de este material', null=True, max_digits=10, decimal_places=2, blank=True)),
                ('costo', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('descripcion', models.CharField(max_length=300, blank=True)),
                ('material', models.ForeignKey(to='material.Material', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Modelo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=120, null=True, blank=True)),
                ('full_name', models.CharField(max_length=120, unique=True, null=True, editable=False, blank=True)),
                ('slug', models.CharField(unique=True, max_length=120, editable=False)),
                ('activo', models.BooleanField(default=True)),
                ('descripcion', models.TextField(null=True, blank=True)),
                ('detalles', models.TextField(null=True, blank=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('video', models.CharField(max_length=120, null=True, blank=True)),
                ('categorias', models.ManyToManyField(related_name='categorias_producto', to='catalogo.Categoria', blank=True)),
                ('color', models.ForeignKey(blank=True, to='utiles.Color', null=True)),
                ('relaciones', models.ManyToManyField(related_name='_relaciones_+', to='catalogo.Producto', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductoImagen',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('foto', models.ImageField(upload_to=catalogo.models.url_imagen_pr)),
                ('orden', models.PositiveIntegerField(default=0)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('actualizado', models.DateTimeField(auto_now=True)),
                ('producto', models.ForeignKey(related_name='imagenes_producto', to='catalogo.Producto')),
            ],
            options={
                'ordering': ['orden'],
            },
        ),
        migrations.CreateModel(
            name='ProductoVariacion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('precio_minorista', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('oferta', models.PositiveIntegerField(default=0)),
                ('precio_oferta', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('producto', models.ForeignKey(related_name='variaciones', to='catalogo.Producto')),
                ('talla', models.ForeignKey(to='utiles.Talla')),
            ],
        ),
        migrations.CreateModel(
            name='SeccionProducto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('modelo', models.ForeignKey(to='catalogo.Modelo', blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='materialproducto',
            name='producto',
            field=models.ForeignKey(related_name='material_producto', blank=True, to='catalogo.Producto'),
        ),
        migrations.AddField(
            model_name='materialproducto',
            name='seccion',
            field=models.ForeignKey(to='catalogo.SeccionProducto', blank=True),
        ),
    ]
