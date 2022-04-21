from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions, status
from .serializers import ItemSerializer, CategorySerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Item, Category, Order, Image
from django.db.models import Q
from django.views import View
from django.shortcuts import render, redirect
from .forms import ExcelForm
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
import pandas as pd
from pathlib import Path
from django.core.files import File
from django.conf import settings
import os

DEFAULT_IMAGE_PATH = Path(Path(__file__).resolve().parent.parent, "default_images_and_spreadsheets") # /belmarket/default_images_and_spreadsheets


class ItemViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Item.objects.all()

    def get(self, request):
        items = self.get_queryset()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


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
            df = pd.read_excel(xl)
            for i in range(len(df.index)):
                row = df.iloc[i]  # the current row of the excel sheet opened with pandas dataframe
                name = row['name']
                parent_string = row['parent_string']
                article = row['article']
                price = row['price']
                pictures = row['pictures']
                if type(pictures) != float:
                    pictures = pictures.split(";")
                else:
                    pictures = None
                if Item.objects.filter(article=article).exists():
                    continue
                print("row: ", row)
                print("name, article, pictures: ", name, article, pictures)  # Beef Belarus BEEF-1 ['C:\\Users\\Best User\\Pictures\\Saved Pictures\\Beef.jfif', 'C:\\Users\\Best User\\Pictures\\Saved Pictures\\Beef2.jfif']
                item = Item.objects.create(name=name, parent_string=parent_string, article=article, price=price)
                media_items_path = os.path.join(settings.MEDIA_ROOT, "items")  # initial image path
                try:
                    os.mkdir(media_items_path)
                except FileExistsError:
                    pass
                if pictures is not None:
                    for picture in pictures:
                        path = Path(DEFAULT_IMAGE_PATH, picture)  # for each picture we get its path
                        with path.open(mode='rb') as f:  # open it as f
                            image = Image.objects.create(item=item)  # create and Image instance
                            image_path = os.path.join(settings.MEDIA_ROOT, "items")  # initial image path
                            dirs = item.hierarchy.split(";")  # "Food;Meat;Beef" --> ["Food", "Meat", "Beef"]
                            for dir in dirs:
                                image_path = os.path.join(image_path, dir)  # image_path/Food/Meat/Beef
                                try:
                                    os.mkdir(image_path)
                                except FileExistsError:  # if directory already exists
                                    pass
                            image_name = item.article + "_" + str(pictures.index(picture)) + ".jpg"  # BEEF-1_0.jpg
                            image.picture = File(f, name=image_name)  # name goes to filename parameter of get_upload_path in .models
                            image.save()
                            continue  # to skip the next category.save() as unnecessary
                item.save()
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
            df = pd.read_excel(xl)
            for i in range(len(df.index)):
                row = df.iloc[i]
                name = row['name']
                parent_string = row['parent_string']
                picture = row['picture']
                if Category.objects.filter(name=name).exists():  # if already is such category then skip iteration
                    continue
                category = Category.objects.create(name=name, parent_string=parent_string)
                if type(picture) == str:
                    path = Path(DEFAULT_IMAGE_PATH, picture)
                    with path.open(mode='rb') as f:
                        category.picture = File(f, name=category.name + ".jpg")  # creating file, writing it down and saving the model
                        category.save()
                        continue  # to skip the next category.save() as unnecessary
                category.save()
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