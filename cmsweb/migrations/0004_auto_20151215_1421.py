# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0003_auto_20151116_1924'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bloque',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(help_text=b'El titulo de la pagina web', max_length=100, blank=True)),
                ('estilo', models.CharField(max_length=100, blank=True)),
                ('cuerpo', models.TextField(blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='page',
            name='titulo_activo',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='bloque',
            name='page',
            field=models.ForeignKey(blank=True, to='cmsweb.Page', null=True),
        ),
    ]
