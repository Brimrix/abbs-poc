from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = "Companies"


class Invoice(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.PROTECT, related_name="invoices"
    )

    paid = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    invoice = models.ForeignKey(
        Invoice, on_delete=models.PROTECT, related_name="orders"
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Item(models.Model):
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, related_name="items"
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    width = models.FloatField()
    height = models.FloatField()
    unit_price = models.FloatField()
    quantity = models.PositiveIntegerField()

    class Meta:
        indexes = [models.Index(fields=["content_type", "object_id"])]
