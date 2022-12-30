# Generated by Django 4.1.4 on 2022-12-30 15:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=7)),
                ('description', models.TextField(blank=True, null=True)),
                ('date', models.DateField(auto_now=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='category.category')),
            ],
        ),
        migrations.CreateModel(
            name='UsersInTransaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paid', models.BooleanField(default=False)),
                ('transaction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transaction.transaction')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'transaction')},
            },
        ),
        migrations.AddField(
            model_name='transaction',
            name='users',
            field=models.ManyToManyField(related_name='transactions', related_query_name='transaction', through='transaction.UsersInTransaction', to=settings.AUTH_USER_MODEL),
        ),
    ]
