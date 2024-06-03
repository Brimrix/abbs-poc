from django.urls import path
from core.views import HomeView
from core.viewsets import UserViewSet

urlpatterns = [
    path("", HomeView.as_view()),
    path(
        "users",
        UserViewSet.as_view(
            {
                "get": "list",
                "post": "create",
            }
        ),
    ),
    path(
        "users/<int:pk>",
        UserViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}),
    ),
]
