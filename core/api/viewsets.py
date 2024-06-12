from rest_framework import viewsets
from core.api import serializers

from django.contrib.auth import get_user_model


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer


class SignUpViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = get_user_model().objects.all()
    serializer_class = serializers.SignUpSerializer
