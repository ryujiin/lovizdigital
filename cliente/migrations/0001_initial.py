# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ubigeo', '__first__'),
        ('catalogo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('genero', models.CharField(blank=True, max_length=100, null=True, choices=[(b'Hombre', b'hombre'), (b'Mujer', b'mujer')])),
                ('dni', models.CharField(max_length=10, null=True, blank=True)),
                ('telefono', models.CharField(max_length=11, null=True, blank=True)),
                ('usuario', models.OneToOneField(related_name='cliente', null=True, blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('verificado', models.BooleanField(default=False)),
                ('valoracion', models.PositiveIntegerField(default=0)),
                ('titulo_comentario', models.CharField(max_length=100, null=True, blank=True)),
                ('comentario', models.TextField()),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('email_invitado', models.CharField(max_length=100, null=True, blank=True)),
                ('recomendacion', models.CharField(blank=True, max_length=10, null=True, choices=[(b'si', b'si'), (b'no', b'no')])),
                ('producto', models.ForeignKey(to='catalogo.Producto')),
                ('usuario', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('variacion', models.ForeignKey(blank=True, to='catalogo.ProductoVariacion', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Direccion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, null=True, blank=True)),
                ('tipo', models.CharField(blank=True, max_length=100, null=True, choices=[(b'envio', b'Direccion de envio'), (b'facturacion', b'Direccion de Facturacion')])),
                ('departamento', models.CharField(max_length=100, null=True, blank=True)),
                ('provincia', models.CharField(max_length=100, null=True, blank=True)),
                ('distrito', models.CharField(max_length=100, null=True, blank=True)),
                ('direccion', models.CharField(max_length=100, null=True, blank=True)),
                ('referencia', models.CharField(max_length=200, null=True, blank=True)),
                ('codigo_postal', models.CharField(max_length=20, null=True, blank=True)),
                ('telefono', models.CharField(max_length=11, null=True, blank=True)),
                ('ubigeo', models.ForeignKey(related_name='direccion', blank=True, to='ubigeo.Ubigeo', max_length=100, null=True)),
                ('usuario', models.ForeignKey(related_name='direcciones', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Favorito',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('producto', models.ForeignKey(related_name='catalogo', blank=True, to='catalogo.Producto', null=True)),
                ('usuario', models.OneToOneField(null=True, blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Suscrito',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.CharField(max_length=100, null=True, blank=True)),
                ('suscrito', models.BooleanField(default=True)),
                ('usuario', models.BooleanField(default=True)),
                ('cliente', models.ForeignKey(blank=True, to='cliente.Cliente', null=True)),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
    ]
