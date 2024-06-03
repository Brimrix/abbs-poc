from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.EmailField(unique=True)

    EMAIL_FIELD = "username"
    USERNAME_FIELD = "username"
