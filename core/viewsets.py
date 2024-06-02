from core.serializers import InvoiceSerializer
from rest_framework.viewsets import ModelViewSet
from core.models import Invoice

class InvoiceViewSet(ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer