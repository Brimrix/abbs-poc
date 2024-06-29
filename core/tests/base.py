from rest_framework.test import APITestCase
from core.tests import factories


class BaseTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        factories.CompanyFactory.create_batch(size=5)
        cls.company = factories.CompanyFactory()
        cls.superuser = factories.UserFactory(is_superuser=True, is_staff=True)
