from django.db import models

# Create your models here.
class Invoice(models.Model):
    price = models.FloatField()
    createdAt = models.DateTimeField(auto_now_add=True)