# Generated by Django 4.0.1 on 2022-02-09 08:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_category_picture_alter_image_picture_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='parent_category',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.category'),
        ),
    ]
