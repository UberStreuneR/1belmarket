from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions, status
from .serializers import ItemSerializer, CategorySerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Item, Category, Order
from django.db.models import Q


class ItemViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Item.objects.all()

    def get(self, request):
        items = self.get_queryset()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


class CategoryViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Category.objects.all()

    def get(self, request):
        categories = self.get_queryset()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class CategorySearchViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, key):
        categories = Category.objects.filter(Q(name__icontains=key)) # irrespective of lowercase/uppercase search for key in name
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class CategoryChildrenViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, name):  # name of the category which children to show
        category = Category.objects.get(name__iexact=name)  # name is exactly same except it's case insensitive
        subcategories = Category.objects.filter(parent=category)  # irrespective of lowercase/uppercase search for key in name
        if subcategories.exists:
            serializer = CategorySerializer(subcategories, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class OrderViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Order.objects.all()

    def get(self, request):
        orders = self.get_queryset()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
