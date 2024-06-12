from core.api.viewsets import UserViewSet, SignUpViewSet
from django.urls import path

urlpatterns = [
    path(
        "users/",
        UserViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "users/<int:pk>/",
        UserViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}),
    ),
    path(
        "signup/",
        SignUpViewSet.as_view(
            {
                "post": "create",
            }
        ),
        name="signup",
    ),
]
