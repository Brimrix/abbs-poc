from rest_framework import viewsets
from core.api import serializers
from core import models

from django.contrib.auth import get_user_model


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer


class SignUpViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = get_user_model().objects.all()
    serializer_class = serializers.SignUpSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = models.Invoice.objects.all()
    serializer_class = serializers.InvoiceSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
