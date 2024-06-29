from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

from core import models


@admin.register(get_user_model())
class UserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (("Company", {"fields": ("company",)}),)


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user"]


@admin.register(models.Company)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(models.Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ["id", "paid", "created_at"]
    list_filter = [
        "paid",
        "company",
    ]


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "invoice", "description"]


@admin.register(models.Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ["id", "content_type", "object_id"]
    list_filter = ["content_type"]
