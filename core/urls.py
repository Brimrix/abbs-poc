from django.urls import re_path
from core.views import HomeView

app_name = "core"
urlpatterns = [
    re_path(r"^(?:.*)/?$", HomeView.as_view()),
]
