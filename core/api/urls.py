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
    ),
    path(
        "invoices/<int:pk>/",
        viewsets.InvoiceViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "delete": "destroy",
            }
        ),
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
        "orders/<int:pk>/",
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
        "items/<int:pk>/",
        viewsets.ItemViewSet.as_view(
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
