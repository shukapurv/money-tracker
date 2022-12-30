from rest_framework import serializers
from .models import Category
from authentication.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
    user = UserSerializer(
        read_only=True, fields=UserSerializer.get_minimal_user_fields())

    class Meta:
        model = Category
        fields = ["id", "user", "name"]
        depth = 1
