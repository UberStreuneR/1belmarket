# Generated by Django 4.0.1 on 2022-05-29 11:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_order_client_remove_order_price_order_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='quantity',
            new_name='amount',
        ),
    ]