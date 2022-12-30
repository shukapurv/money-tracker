from authentication.models import User
from django.db import models

from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.


class Category(models.Model):
    user = models.ForeignKey(
        User, related_name="categories", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.name


@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs) -> None:
    if created:
        Category.objects.create(user=instance, name="Electricity")
        Category.objects.create(user=instance, name="Laundry")
        Category.objects.create(user=instance, name="Transport")
        Category.objects.create(user=instance, name="Food")
        Category.objects.create(user=instance, name="Groccery")
