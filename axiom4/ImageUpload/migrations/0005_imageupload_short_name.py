# Generated by Django 4.2.4 on 2023-08-19 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ImageUpload', '0004_rename_image_imageupload'),
    ]

    operations = [
        migrations.AddField(
            model_name='imageupload',
            name='short_name',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
    ]