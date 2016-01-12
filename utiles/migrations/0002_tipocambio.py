# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TipoCambio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha', models.DateField(auto_now_add=True)),
                ('cambio', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
            ],
        ),
    ]
