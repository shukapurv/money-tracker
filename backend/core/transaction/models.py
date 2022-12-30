from authentication.models import User
from django.db import models
import calendar
from authentication.constants import *
from datetime import timedelta
from category.models import Category


class Transaction(models.Model):
    users = models.ManyToManyField(User,through=UsersInTransaction,related_name="transactions",related_query_name="transaction")
    name=models.CharField(max_length=30)
    category=models.ForeignKey(
        Category,on_delete=models.SET_NULL,null=True,blank=True
    )
    descrition=models.TextField(null=True,blank=True)
    date=models.DateField(auto_now=True)

    def __str__(self)->str:
        return self.name

class UsersInTransaction():
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    transaction=models.ForeignKey(Transaction,on_delete=models.CASCADE)

    class Meta:
        unique_together=("user","transaction")