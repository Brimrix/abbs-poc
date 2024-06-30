from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
import uuid


class User(AbstractUser):
    username = models.EmailField(unique=True)
    company = models.ForeignKey(
        "Company",
        on_delete=models.SET_NULL,
        related_name="employees",
        null=True,
    )

    EMAIL_FIELD = "username"
    REQUIRED_FIELDS = []


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=50)


class Company(models.Model):
    name = models.CharField(max_length=50, unique=True)
    defaultRate = models.FloatField(default=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = "Companies"


class Invoice(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    company = models.ForeignKey(
        Company, on_delete=models.PROTECT, related_name="invoices"
    )

    discount = models.FloatField(default=0)
    paid = models.BooleanField(default=False)
    items = GenericRelation("Item")
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    invoice = models.ForeignKey(
        Invoice, on_delete=models.PROTECT, related_name="orders"
    )
    description = models.CharField(max_length=255, default="")
    items = GenericRelation("Item")

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Item(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to={"model__in": ["order", "invoice"]},
    )
    object_id = models.UUIDField(primary_key=False)
    content_object = GenericForeignKey()

    description = models.CharField(max_length=255, default="")

    width = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    unit_price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField()

    class Meta:
        indexes = [models.Index(fields=["content_type", "object_id"])]

    @property
    def area(self):
        return (self.width * self.height) / 144

    @property
    def isOrder(self):
        return self.content_type == "order"

    @property
    def amount(self):
        return self.area * self.quantity * self.unit_price
