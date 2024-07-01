from core.api import viewsets
from django.urls import path

urlpatterns = [
    path(
        "users/",
        viewsets.UserViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "users/<int:pk>/",
        viewsets.UserViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "invoices/",
        viewsets.InvoiceViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
        name="invoices-list",
    ),
    path(
        "invoices/<uuid:pk>/",
        viewsets.InvoiceViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
        name="invoices-detail",
    ),
    path(
        "orders/",
        viewsets.OrderViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "orders/<uuid:pk>/",
        viewsets.OrderViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "items/",
        viewsets.ItemViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "items/<uuid:pk>/",
        viewsets.ItemViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "companies/",
        viewsets.CompanyViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "companies/<int:pk>/",
        viewsets.CompanyViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
    ),
    path(
        "signup/",
        viewsets.SignUpViewSet.as_view(
            {
                "post": "create",
            }
        ),
        name="signup",
    ),
]
