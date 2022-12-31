from rest_framework import serializers
from authentication.serializers import DynamicModelSerializer, TransactionUserSerializer, UserSerializer
from .models import *
from category.serializers import CategorySerializer


class TransactionSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(
        fields=UserSerializer.get_minimal_user_fields())
    users = UserSerializer(
        fields=UserSerializer.get_minimal_user_fields(), many=True)
    category = CategorySerializer(many=False)

    class Meta:
        model = Transaction
        fields = ["id", "name", "description",
                  "amount", "date", "category", "users", "created_by"]


class UsersInTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = UsersInTransaction
        fields = "__all__"
