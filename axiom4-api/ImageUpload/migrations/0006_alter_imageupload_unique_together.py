# Generated by Django 4.2.4 on 2023-08-19 22:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0005_remove_post_short_tag'),
        ('ImageUpload', '0005_imageupload_short_name'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='imageupload',
            unique_together={('short_name', 'post')},
        ),
    ]
