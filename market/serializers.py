from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Item, Image

class ItemSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True)

    class Meta:
        model = Item
        fields = '__all__'
