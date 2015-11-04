# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ubigeo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField()),
                ('political_division', models.PositiveSmallIntegerField(choices=[(1, b'Region'), (2, b'Provincia'), (3, b'Distrito')])),
                ('parent', models.ForeignKey(to='ubigeo.Ubigeo', null=True)),
            ],
        ),
    ]
