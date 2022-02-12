from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Item, Image, Category, Order


class ItemSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True)

    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    # queryset = Category.objects.prefetch_related('subcategories')
    parent = serializers.StringRelatedField()

    class Meta:
        model = Category
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.StringRelatedField(many=True)

    class Meta:
        model = Order
        fields = '__all__'
