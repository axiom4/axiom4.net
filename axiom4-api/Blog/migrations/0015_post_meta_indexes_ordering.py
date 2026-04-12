from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0014_alter_post_title'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['-created_at'], name='blog_post_created_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['author_id'], name='blog_post_author_idx'),
        ),
    ]
