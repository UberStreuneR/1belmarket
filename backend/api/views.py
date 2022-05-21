from django.contrib.auth.models import User, Group
from django.http import Http404
from rest_framework import viewsets
from rest_framework import permissions, status, generics
from .serializers import ItemSerializer, CategorySerializer, OrderSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import Item, Category, Order, Image
from django.db.models import Q
from django.views import View
from django.shortcuts import render, redirect
from .forms import ExcelForm, UserRegisterForm
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.contrib.auth import authenticate, login

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


class UserRegisterView(APIView):
    def post(self, request):
        form = UserRegisterForm(request.data)
        
        try:
            user_by_username = User.objects.get(username=request.data['username'])
            if user_by_username is not None:
                return Response({'username': ['Username taken']}, status=status.HTTP_400_BAD_REQUEST) 
        except User.DoesNotExist:
            pass

        try:
            user_by_email = User.objects.get(email=request.data['email'])
            if user_by_email is not None:
                return Response({'email': ['Email taken']}, status=status.HTTP_400_BAD_REQUEST) 
        except User.DoesNotExist:
            pass

        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            user = User.objects.get(username=username)
            token = Token.objects.get(user=user)
            serializer = UserSerializer(user)
            response_data = serializer.data
            response_data.update({'token': token.key})
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAuthView(APIView):
    def post(self, request):
        data = request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            token = Token.objects.get(user=user)
            return Response({
                'token': token.key,
                'username': user.get_username(),
                'email': user.email
            }, status=status.HTTP_200_OK)
        return Response('Incorrect credentials', status=status.HTTP_401_UNAUTHORIZED)


# class TestAuthView(APIView):
#     def post(self, request):
#         data = request.data
#         data_token = data['token']
#         username = data['username']
#         user = User.objects.get(username=username)
#         token = Token.objects.get(user=user)
#         if data_token == token.key:
#             return Response({'success': 'All good'})
#         return Response({'token': token.key, 'data_token': data_token}, status=status.HTTP_401_UNAUTHORIZED)

