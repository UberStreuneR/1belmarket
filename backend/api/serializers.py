from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Item, Image, Category, Order


class ImageSerializer(serializers.ModelSerializer):
    url = serializers.ImageField(source='picture')
    
    class Meta:
        model = Image
        fields = ['url']


class ItemSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    # queryset = Category.objects.prefetch_related('subcategories')
    parent = serializers.StringRelatedField()

    class Meta:
        model = Category
        fields = ['id', 'parent', 'name', 'hierarchy', 'picture', 'subcategories']


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.StringRelatedField(many=True)

    class Meta:
        model = Order
        fields = '__all__'
