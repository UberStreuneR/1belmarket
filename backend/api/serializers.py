import json
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
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
        fields = ['id', 'name', 'article', 'price', 'description', 'rating', 'images', 'hierarchy']
        # fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    # queryset = Category.objects.prefetch_related('subcategories')
    # parent = serializers.StringRelatedField() 
    # subcategories = serializers.HyperlinkedRelatedField(view_name="category-detail", read_only=True, many=True)
    # subcategories = SubcategorySerializer(many=True)

    # subcategories = RecursiveField(allow_null=True)

    class Meta:
        model = Category
        # fields = ['id', 'name', 'picture', 'hierarchy']
        fields = ['id', 'name', 'picture', 'subcategories', 'hierarchy']


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.StringRelatedField(many=True)

    class Meta:
        model = Order
        fields = '__all__'
