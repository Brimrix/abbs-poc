from core.tests.base import BaseTestCase
from django.urls import reverse_lazy
from core import models


class UserTestCase(BaseTestCase):
    def test_user_sign_up(self):
        self.client.force_login(self.superuser)
        response = self.client.post(
            reverse_lazy("signup"),
            {
                "username": "waqar@test.com",
                "first_name": "Waqar",
                "last_name": "Ali",
                "company": "New Company",
                "phone": "+9232342424",
                "address": "Mars",
                "password": "change_me",
                "confirm_password": "change_me",
            },
        )
        self.assertTrue(models.Company.objects.filter(name="New Company").exists())
        self.assertTrue(models.User.objects.filter(username="waqar@test.com").exists())
        self.assertEqual(response.status_code, 201)

    def test_user_sign_up_weak_password(self):
        self.client.force_login(self.superuser)
        response = self.client.post(
            reverse_lazy("signup"),
            {
                "username": "waqar@test.com",
                "first_name": "Waqar",
                "last_name": "Ali",
                "company": "New Company",
                "phone": "+9232342424",
                "address": "Mars",
                "password": "1234",
                "confirm_password": "1234",
            },
        )
        self.assertFalse(models.Company.objects.filter(name="New Company").exists())
        self.assertFalse(models.User.objects.filter(username="waqar@test.com").exists())
        self.assertEqual(response.status_code, 400)

    def test_user_sign_up_no_last_name(self):
        self.client.force_login(self.superuser)
        response = self.client.post(
            reverse_lazy("signup"),
            {
                "username": "waqar@test.com",
                "first_name": "Waqar",
                "company": "New Company",
                "phone": "+9232342424",
                "address": "Mars",
                "password": "change_me",
                "confirm_password": "change_me",
            },
        )
        self.assertTrue(models.Company.objects.filter(name="New Company").exists())
        self.assertTrue(models.User.objects.filter(username="waqar@test.com").exists())
        self.assertEqual(response.status_code, 201)
