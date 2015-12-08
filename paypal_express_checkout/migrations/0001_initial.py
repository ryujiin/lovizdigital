# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(max_length=256, verbose_name='Identifier', blank=True)),
                ('name', models.CharField(max_length=2048, verbose_name='Name')),
                ('description', models.CharField(max_length=4000, verbose_name='Description')),
                ('value', models.DecimalField(verbose_name='Value', max_digits=8, decimal_places=2)),
                ('currency', models.CharField(default=b'USD', max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentTransaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('object_id', models.PositiveIntegerField(null=True, blank=True)),
                ('creation_date', models.DateTimeField(auto_now_add=True, verbose_name='Creation time', null=True)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Time')),
                ('transaction_id', models.CharField(max_length=32, verbose_name='Transaction ID')),
                ('value', models.DecimalField(verbose_name='Transaction value', max_digits=8, decimal_places=2)),
                ('status', models.CharField(max_length=16, verbose_name='Payment status', choices=[(b'Checkout', b'Checkout'), (b'Pending', b'Pending'), (b'Canceled', b'Canceled'), (b'Completed', b'Completed'), (b'Canceled_Reversal', b'Canceled_Reversal'), (b'Created', b'Created'), (b'Denied', b'Denied'), (b'Expired', b'Expired'), (b'Failed', b'Failed'), (b'Refunded', b'Refunded'), (b'Reversed', b'Reversed'), (b'Processed', b'Processed'), (b'Voided', b'Voided')])),
                ('content_type', models.ForeignKey(blank=True, to='contenttypes.ContentType', null=True)),
                ('user', models.ForeignKey(verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-creation_date', 'transaction_id'],
            },
        ),
        migrations.CreateModel(
            name='PaymentTransactionError',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Time')),
                ('paypal_api_url', models.CharField(max_length=4000, verbose_name='Paypal API URL', blank=True)),
                ('request_data', models.TextField(verbose_name='Request data', blank=True)),
                ('response', models.TextField(verbose_name='Response String', blank=True)),
                ('user', models.ForeignKey(verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PurchasedItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('identifier', models.CharField(max_length=256, verbose_name='Identifier', blank=True)),
                ('object_id', models.PositiveIntegerField(null=True, blank=True)),
                ('price', models.FloatField(null=True, verbose_name='Price', blank=True)),
                ('quantity', models.PositiveIntegerField(verbose_name='Quantity')),
                ('content_type', models.ForeignKey(blank=True, to='contenttypes.ContentType', null=True)),
                ('item', models.ForeignKey(verbose_name='Item', blank=True, to='paypal_express_checkout.Item', null=True)),
                ('transaction', models.ForeignKey(verbose_name='Transaction', to='paypal_express_checkout.PaymentTransaction')),
                ('user', models.ForeignKey(verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-transaction__date', 'transaction__transaction_id'],
            },
        ),
    ]
