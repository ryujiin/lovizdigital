# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmsweb', '0002_pages'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Pages',
            new_name='Page',
        ),
    ]
