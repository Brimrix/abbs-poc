from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    username = models.EmailField(unique=True)

    EMAIL_FIELD = "username"
    REQUIRED_FIELDS = []


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )
    company = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=50)
