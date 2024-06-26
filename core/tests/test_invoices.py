from core.tests.base import BaseTestCase
from django.urls import reverse_lazy
from core.tests import factories


class TestInvoice(BaseTestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        super().setUpTestData()
        factories.InvoiceFactory.create_batch(size=10)

    def test_list_invoices(self):
        self.client.force_login(self.superuser)
        response = self.client.get(reverse_lazy("invoices-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 10)

    def test_create_invoice(self):
        items = [
            {
                "object_id": 1,  # "order id",
                "id": 1,  # Item id
                "description": "Description 1",
                "image_src": "",
                "height": 0,
                "width": 0,
                "area": 0,
                "unit_price": 0,
                "quantity": 1,
            },
            {
                "object_id": 1,  # "order id",
                "id": 2,  # Item id
                "description": "Description 2",
                "image_src": "",
                "height": 0,
                "width": 0,
                "area": 0,
                "unit_price": 0,
                "quantity": 1,
            },
            {
                "object_id": 1,  # "order id",
                "id": 3,  # Item id
                "description": "Description 3",
                "image_src": "",
                "height": 0,
                "width": 0,
                "area": 0,
                "unit_price": 0,
                "quantity": 1,
            },
        ]

        self.client.force_login(self.superuser)
        response = self.client.post(
            reverse_lazy("invoices-list"),
            data={
                "company": self.company.id,
                "items": items,
                "orders": [{"object_id": 1, "description": "test", "items": items}],
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
