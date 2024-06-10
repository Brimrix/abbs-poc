from django.urls import path, re_path
from core.views import HomeView
from core.viewsets import UserViewSet, SignUpViewSet

app_name = "core"
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
    re_path(r"^(?:.*)/?$", HomeView.as_view()),
]
