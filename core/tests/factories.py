import factory
from django.contrib.auth import get_user_model
from core import models


class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Faker("email")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    is_active = True
    company = factory.Iterator(models.Company.objects.all())

    class Meta:
        model = get_user_model()

    @factory.post_generation
    def set_password(obj, create, extracted, **kwargs):
        obj.set_password("change_me")


class ProfileFactory(factory.django.DjangoModelFactory):
    phone = factory.Faker("phone_number")
    address = factory.Faker("address")
    user = factory.SubFactory("core.tests.factories.UserFactory")

    class Meta:
        model = models.Profile


class CompanyFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("company")

    class Meta:
        model = models.Company


class InvoiceFactory(factory.django.DjangoModelFactory):
    company = factory.Iterator(models.Company.objects.all())
    paid = factory.Faker("pybool")

    class Meta:
        model = models.Invoice


class OrderFactory(factory.django.DjangoModelFactory):
    invoice = factory.Iterator(models.Invoice.objects.all())

    class Meta:
        model = models.Order
