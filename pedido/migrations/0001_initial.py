# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EstadoPedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
                ('slug_estado', models.CharField(max_length=120, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='MetodoEnvio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(null=True, blank=True)),
                ('precio', models.DecimalField(max_digits=12, decimal_places=2)),
            ],
        ),
        migrations.CreateModel(
            name='MetodoPago',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100, null=True, blank=True)),
                ('descripcion', models.TextField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ModificacionPedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha_modificacion', models.DateTimeField(auto_now=True, db_index=True)),
                ('estado_actual', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('id_pago', models.CharField(max_length=100, null=True, blank=True)),
                ('fecha', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('descripcion', models.CharField(max_length=100, null=True, blank=True)),
                ('metodo_pago', models.ForeignKey(blank=True, to='pedido.MetodoPago', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('numero_pedido', models.CharField(max_length=120, null=True, blank=True)),
                ('gasto_envio', models.DecimalField(null=True, max_digits=12, decimal_places=2, blank=True)),
                ('fecha_compra', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('estado_pedido', models.CharField(default=b'autenticado', max_length=120, choices=[(b'autenticado', 'Autenticado - El usuario se encuentra autenticado y el pedido le pertenece'), (b'metodo_envio', 'Metodo de Envio - Ya coloco el metodo de envio, esperando metodo de pago'), (b'metodo_pago', 'Metodo de Pago - Ya selecciono el metodo de pago'), (b'pagado', 'Pagado - El pago se realizo correctamente, espere el envio del producto'), (b'error_pago', 'Error en Pago - Ocurrio un error al pagar'), (b'enviado', 'Enviado - El producto fue enviado'), (b'devuelto', 'Devuelto - El producto fue devuelto')])),
                ('direccion_envio', models.ForeignKey(blank=True, to='cliente.Direccion', null=True)),
                ('metodo_pago', models.ForeignKey(blank=True, to='pedido.MetodoPago', null=True)),
                ('metodoenvio', models.ForeignKey(blank=True, to='pedido.MetodoEnvio', null=True)),
                ('pago_pedido', models.ForeignKey(blank=True, to='pedido.Pago', null=True)),
                ('user', models.ForeignKey(related_name='Pedido', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='modificacionpedido',
            name='pedido',
            field=models.ForeignKey(to='pedido.Pedido'),
        ),
    ]
