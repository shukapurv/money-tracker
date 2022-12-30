from rest_framework import serializers
from authentication.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate


class DynamicModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


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


class UserSerializer(DynamicModelSerializer):

    class Meta:
        model = User
        exclude = ('password',)
        depth = 2

    @staticmethod
    def get_minimal_user_fields():
        return (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
        )



class TransactionUserSerializer(DynamicModelSerializer):
    paid = serializers.BooleanField(default=False)

    class Meta:
        model = User
        exclude = ('password',)
        depth = 2

    @staticmethod
    def get_transaction_user():
        return (
            "id",
            "username",
            "first_name",
            "last_name",
            "paid",
        )
