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

    def perform_create(self, serializer):
        company_serializer = serializers.CompanySerializer(
            data={"name": serializer.validated_data.pop("company")}
        )
        company_serializer.is_valid(raise_exception=True)
        company = company_serializer.save()
        serializer.save(company=company)


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = models.Invoice.objects.all().prefetch_related(
        "items", "orders", "orders__items"
    )

    def get_serializer_class(self):
        if self.action == "create":
            return serializers.InvoiceCreateSerializer
        elif self.action == "retrieve":
            return serializers.InvoiceDetailSerializer
        return serializers.InvoiceSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer
