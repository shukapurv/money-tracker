from rest_framework import serializers
from auth.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('id', 'email', 'password',
                  'username', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'id':  {'required': False, 'read_only': True}
        }

    def create(self, validated_data):

        user = User.objects.create_user(username=validated_data["username"], email=validated_data["email"],
                                        password=validated_data["password"], first_name=validated_data["first_name"],
                                        last_name=validated_data["last_name"])
        authenticate(
            username=validated_data["username"], password=validated_data["password"])
        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(default=None)
    password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True, default=None)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'id':  {'required': False, 'read_only': True},
            'username': {'required': False}
        }

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            data['user'] = user
        else:
            raise serializers.ValidationError("Unable to login :( !")
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)
        depth = 2
