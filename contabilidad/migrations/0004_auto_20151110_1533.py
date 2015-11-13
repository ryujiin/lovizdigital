# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('utiles', '0001_initial'),
        ('cliente', '0002_mayorista'),
        ('contabilidad', '0003_auto_20151109_1937'),
    ]

    operations = [
        migrations.CreateModel(
            name='SerieTallas',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.RenameField(
            model_name='ventamayorista',
            old_name='monto',
            new_name='cantidad_docenas',
        ),
        migrations.RemoveField(
            model_name='serieventamayorista',
            name='monto',
        ),
        migrations.RemoveField(
            model_name='serieventamayorista',
            name='talla',
        ),
        migrations.RemoveField(
            model_name='serieventamayorista',
            name='venta',
        ),
        migrations.RemoveField(
            model_name='ventamayorista',
            name='precio',
        ),
        migrations.AddField(
            model_name='serieventamayorista',
            name='fecha_creacion',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='serieventamayorista',
            name='mayorista',
            field=models.ForeignKey(default=1, blank=True, to='cliente.Mayorista'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='serieventamayorista',
            name='nombre',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='serieventamayorista',
            name='precio',
            field=models.DecimalField(null=True, max_digits=10, decimal_places=1, blank=True),
        ),
        migrations.AddField(
            model_name='ventamayorista',
            name='serie',
            field=models.ForeignKey(default='', to='contabilidad.SerieVentaMayorista'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cuentamayorista',
            name='fecha',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='pagomayorista',
            name='fecha',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='ventamayorista',
            name='fecha',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='ventamayorista',
            name='mayorista',
            field=models.ForeignKey(related_name='Cliente_mayorista', blank=True, to='cliente.Mayorista'),
        ),
        migrations.AlterField(
            model_name='ventamayorista',
            name='producto',
            field=models.ForeignKey(to='catalogo.Producto', blank=True),
        ),
        migrations.AddField(
            model_name='serietallas',
            name='serie_venta',
            field=models.ForeignKey(related_name='Tallas', to='contabilidad.SerieVentaMayorista'),
        ),
        migrations.AddField(
            model_name='serietallas',
            name='talla',
            field=models.ForeignKey(to='utiles.Talla'),
        ),
    ]
