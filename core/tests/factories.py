import factory
from django.contrib.auth import get_user_model
from core import models
from django.contrib.contenttypes.models import ContentType
import uuid


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
    id = factory.LazyFunction(uuid.uuid4)
    invoice = factory.Iterator(models.Invoice.objects.all())

    class Meta:
        model = models.Order


class ItemsFactory(factory.django.DjangoModelFactory):
    id = factory.LazyFunction(uuid.uuid4)
    object_id = factory.SelfAttribute("content_object.id")
    content_type = factory.LazyAttribute(
        lambda obj: ContentType.objects.get_for_model(obj.content_object)
    )
    description = factory.Faker("pystr")

    width = factory.Faker("pyfloat", min_value=1, max_value=1000, positive=True)
    height = factory.Faker("pyfloat", min_value=1, max_value=1000, positive=True)
    unit_price = factory.Faker("pyfloat", min_value=1, max_value=1000, positive=True)

    quantity = factory.Faker("pyint", min_value=1, max_value=100)

    class Meta:
        exclude = ["content_object"]
        abstract = True


class InvoiceItemFactory(ItemsFactory):
    content_object = factory.Iterator(models.Invoice.objects.all())

    class Meta:
        model = models.Item


class OrderItemFactory(ItemsFactory):
    content_object = factory.Iterator(models.Order.objects.all())

    class Meta:
        model = models.Item
