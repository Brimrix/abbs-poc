from typing import Any
from django.core.management import BaseCommand
from core.tests import factories


class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> str | None:
        factories.CompanyFactory.create_batch(size=5)
        factories.ProfileFactory(
            user__username="superuser@abbs.com",
            user__is_superuser=True,
            user__is_staff=True,
        )
        factories.InvoiceFactory.create_batch(size=30)
        factories.OrderFactory.create_batch(size=40)
        self.stdout.write("Database Populated", self.style.SUCCESS)
