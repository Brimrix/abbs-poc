from django.urls import path, re_path
from core.views import HomeView
from core.viewsets import UserViewSet

urlpatterns = [
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
    re_path(r"^(?:.*)/?$", HomeView.as_view()),
]
