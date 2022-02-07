from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ItemSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Item


class ItemViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Item.objects.all()

    def get(self, request, format=None):
        items = self.get_queryset()
        serializer = ItemSerializer(items, many=True)
        print(serializer.data)
        return Response(serializer.data)
