from django.contrib.auth.models import User, Group
from django.http import Http404
from rest_framework import viewsets
from rest_framework import permissions, status, generics
from .serializers import ItemSerializer, CategorySerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Item, Category, Order, Image
from django.db.models import Q
from django.views import View
from django.shortcuts import render, redirect
from .forms import ExcelForm
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin

from pathlib import Path
from django.core.files import File
from django.conf import settings
import os


class ItemViewSet(generics.ListAPIView):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Item.objects.all()


class ItemSearchViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


    def get(self, request, key):
        items = Item.objects.filter(Q(name__icontains=key)
                                    | Q(article__icontains=key))  # case insensitive search by name and article fields
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


class CategoryViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Category.objects.all()

    def get(self, request):
        categories = self.get_queryset()
        serializer = CategorySerializer(categories, many=True, context={'request': request})
        return Response(serializer.data)

class CategoryDetailView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def get_queryset(self):
    #     return Category.objects.all()

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Http404

    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, context={'request': request})
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


class UploadItemsFromExcel(UserPassesTestMixin, LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        form = ExcelForm()
        context = {
            'form': form,
            'title': 'items'
        }
        return render(self.request, "api/upload.html", context)

    def post(self, *args, **kwargs):
        form = ExcelForm(self.request.POST, self.request.FILES)

        if form.is_valid():
            xl = form.cleaned_data['file']
            Item.objects.create_from_excel(xl)

            return redirect("/")

    def test_func(self):  # test function for "UserPassesTestMixin", in which case it's just a boolean of user being a staff member
        return self.request.user.is_staff


# TODO: UploadOzonFields, UploadYandexFields
# One item (by vendor code) will have its OZON or Yandex fields uploaded in excel


class UploadCategoriesFromExcel(UserPassesTestMixin, LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        form = ExcelForm()
        context = {
            'form': form,
            'title': 'categories'
        }
        return render(self.request, "api/upload.html", context)

    #  https://docs.djangoproject.com/en/4.0/topics/files/
    def post(self, *args, **kwargs):
        form = ExcelForm(self.request.POST, self.request.FILES)

        if form.is_valid():
            xl = form.cleaned_data['file']
            Category.objects.create_from_excel(xl)

            return redirect("/")

    def test_func(self):  # test function for "UserPassesTestMixin", in which case it's just a boolean of user being a staff member
        return self.request.user.is_staff


class DeleteItemsView(UserPassesTestMixin, LoginRequiredMixin, View):

    def get(self, *args, **kwargs):
        Item.objects.all().delete()
        return redirect("/")

    def test_func(self):  # test function for "UserPassesTestMixin", in which case it's just a boolean of user being a staff member
        return self.request.user.is_staff

class DeleteCategoriesView(UserPassesTestMixin, LoginRequiredMixin, View):

    def get(self, *args, **kwargs):
        Category.objects.all().delete()
        return redirect("/")

    def test_func(self):  # test function for "UserPassesTestMixin", in which case it's just a boolean of user being a staff member
        return self.request.user.is_staff

class DeleteCategoriesAndItemsView(UserPassesTestMixin, LoginRequiredMixin, View):

    def get(self, *args, **kwargs):
        Item.objects.all().delete()
        Category.objects.all().delete()
        return redirect("/")

    def test_func(self):  # test function for "UserPassesTestMixin", in which case it's just a boolean of user being a staff member
        return self.request.user.is_staff