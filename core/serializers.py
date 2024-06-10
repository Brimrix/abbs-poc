from django.contrib.auth import get_user_model
from rest_framework import serializers
from core.models import Profile
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "first_name", "last_name"]


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField(default="")

    company = serializers.CharField(source="profile.company")
    phone = serializers.CharField(source="profile.phone")
    address = serializers.CharField(source="profile.address")
    confirm_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        fields = [
            "username",
            "first_name",
            "last_name",
            "company",
            "phone",
            "address",
            "password",
            "confirm_password",
        ]

    def validate(self, attrs):
        if not attrs["password"] == attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords don't match.")
        try:
            validate_password(attrs["password"])
        except serializers.ValidationError as err:
            raise serializers.ValidationError("Password not strong") from err
        return super().validate(attrs)

    def create(self, validated_data):
        user_data = {
            field: validated_data[field]
            for field in ["username", "password", "first_name", "last_name"]
        }
        User = get_user_model()
        user = User.objects.create(**user_data)
        Profile.objects.create(user=user, **validated_data["profile"])
        return user
