# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('catalogo', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Carro',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sesion_carro', models.CharField(max_length=120, null=True, blank=True)),
                ('estado', models.CharField(default=b'Abierto', max_length=128, choices=[(b'Abierto', 'Abierto - Actualmente activa  '), (b'Fusionada', 'Fusionada - sustituida por otra canasta '), (b'Guardado', 'Guardado - para los articulos para comprar mas adelante '), (b'Congelado', 'Congelado - la canasta no se puede modificar '), (b'Enviado', 'Enviado - ha sido ordenado en la caja')])),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_submitted', models.DateTimeField(null=True, blank=True)),
                ('pedido', models.ForeignKey(blank=True, to='pedido.Pedido', null=True)),
                ('propietario', models.ForeignKey(related_name='Carrito', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='LineaCarro',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.PositiveIntegerField(default=1)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('carro', models.ForeignKey(related_name='lineas', to='carro.Carro')),
                ('producto', models.ForeignKey(blank=True, to='catalogo.Producto', null=True)),
                ('variacion', models.ForeignKey(blank=True, to='catalogo.ProductoVariacion', null=True)),
            ],
        ),
    ]
