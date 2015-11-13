# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0002_mayorista'),
        ('contabilidad', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CuentaMayorista',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateTimeField()),
                ('deuda_mes', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('acuenta_mes', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('venta_mes', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('mayorista', models.ForeignKey(to='cliente.Mayorista')),
            ],
        ),
        migrations.CreateModel(
            name='Ingresos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateTimeField()),
                ('monto', models.DecimalField(help_text=b'La cantidad de dinero que ingreso', null=True, max_digits=10, decimal_places=2, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='PagoMayorista',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateTimeField()),
                ('monto', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('mayorista', models.ForeignKey(to='cliente.Mayorista')),
            ],
        ),
        migrations.RenameField(
            model_name='serieventamayorista',
            old_name='cantidad',
            new_name='monto',
        ),
        migrations.RenameField(
            model_name='ventamayorista',
            old_name='cantidad',
            new_name='monto',
        ),
    ]
