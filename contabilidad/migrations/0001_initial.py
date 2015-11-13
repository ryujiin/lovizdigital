# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0002_mayorista'),
        ('catalogo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SerieVentaMayorista',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.PositiveIntegerField(default=0)),
                ('talla', models.ForeignKey(related_name='Talla', to='catalogo.ProductoVariacion')),
            ],
        ),
        migrations.CreateModel(
            name='VentaMayorista',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateTimeField()),
                ('cantidad', models.DecimalField(null=True, max_digits=10, decimal_places=1, blank=True)),
                ('precio', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('mayorista', models.ForeignKey(related_name='Cliente_mayorista', to='cliente.Mayorista')),
                ('producto', models.ForeignKey(to='catalogo.Producto')),
            ],
        ),
        migrations.AddField(
            model_name='serieventamayorista',
            name='venta',
            field=models.ForeignKey(to='contabilidad.VentaMayorista'),
        ),
    ]
