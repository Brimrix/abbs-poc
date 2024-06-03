import factory
from django.contrib.auth import get_user_model


class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Faker("email")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    is_active = True

    class Meta:
        model = get_user_model()

    @factory.post_generation
    def set_password(obj, create, extracted, **kwargs):
        obj.set_password("change_me")
