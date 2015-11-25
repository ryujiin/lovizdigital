# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='enviado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='pedido',
            name='pagado',
            field=models.BooleanField(default=False),
        ),
    ]
