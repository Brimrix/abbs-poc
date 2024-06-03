from typing import Any
from django.core.management import BaseCommand
from core.tests import factories


class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> str | None:
        factories.UserFactory(username="superuser@abbs.com", is_superuser=True)
        self.stdout.write("Database Populated", self.style.SUCCESS)
