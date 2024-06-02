from django.urls import path
from core.views import HomeView
from core.viewsets import InvoiceViewSet

urlpatterns =[
    path('',HomeView.as_view()),
    path('invoices',InvoiceViewSet.as_view({
        "get":"list",
        "post":"create",
    })),
    path('invoices/<int:pk>',InvoiceViewSet.as_view({
        "get":"retrieve",
        "put":"update",
        "delete":"destroy"
    })),
]