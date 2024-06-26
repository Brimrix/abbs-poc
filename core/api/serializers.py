from django.contrib.auth import get_user_model
from rest_framework import serializers
from core import models
from django.contrib.auth.password_validation import validate_password
from django.contrib.contenttypes.models import ContentType


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "first_name", "last_name"]


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField(default="")

    company = serializers.CharField()
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
            for field in ["username", "first_name", "last_name", "company"]
        }

        User = get_user_model()
        user = User.objects.create(
            **user_data,
            is_active=True,
        )
        user.set_password(validated_data["password"])
        user.save()
        models.Profile.objects.create(user=user, **validated_data["profile"])

        return user


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = ["id", "name", "defaultRate"]


class InvoiceSerializer(serializers.ModelSerializer):
    company_name = serializers.ReadOnlyField(source="company.name")

    class Meta:
        model = models.Invoice
        fields = ["id", "company", "company_name", "paid", "created_at"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ["id", "invoice"]


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Item
        fields = ["width", "height", "unit_price", "quantity"]


class InvoiceItemSerializer(ItemSerializer):
    object_id = serializers.IntegerField()
    model = serializers.SlugRelatedField(
        slug_field="model",
        source="content_type",
        required=False,
        queryset=ContentType.objects.filter(model__in=["order", "invoice"]),
    )

    class Meta:
        model = models.Item
        fields = ItemSerializer.Meta.fields + [
            "id",
            "object_id",
            "description",
            "model",
            "area",
            "amount",
        ]


class InvoiceOrderSerializer(serializers.ModelSerializer):
    object_id = serializers.PrimaryKeyRelatedField(
        source="invoice", queryset=models.Invoice.objects.all()
    )
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = models.Order
        fields = ["id", "object_id", "description", "items"]

    def create(self, validated_data):
        items = validated_data.pop("items")
        order = super().create(validated_data)
        items_serializer = InvoiceItemSerializer(
            data=[
                {
                    **item,
                    "object_id": order.id,
                    "model": "order",
                }
                for item in items
            ],
            many=True,
        )

        items_serializer.is_valid(raise_exception=True)
        items_serializer.save()

        return order


class InvoiceCreateSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True)
    orders = InvoiceOrderSerializer(many=True, required=False)

    class Meta:
        model = models.Invoice
        fields = ["id", "company", "items", "orders", "discount"]

    def create(self, validated_data):
        items = validated_data.pop("items")
        orders = validated_data.pop("orders")
        invoice = super().create(validated_data)

        orders_serializer = InvoiceOrderSerializer(
            data=[
                {
                    **order,
                    "object_id": invoice.id,
                }
                for order in orders
            ],
            many=True,
        )

        orders_serializer.is_valid(raise_exception=True)
        orders_serializer.save()

        items_serializer = InvoiceItemSerializer(
            data=[
                {
                    **item,
                    "object_id": invoice.id,
                    "model": "invoice",
                }
                for item in items
            ],
            many=True,
        )

        items_serializer.is_valid(raise_exception=True)
        items_serializer.save()

        return invoice
