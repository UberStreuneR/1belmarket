from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('items/', views.ItemViewSet.as_view()),
    path('categories/', views.CategoryViewSet.as_view()),
    path('categories-search/<str:key>', views.CategorySearchViewSet.as_view()),
    path('categories-children/<str:name>', views.CategoryChildrenViewSet.as_view()),
    path('orders/', views.OrderViewSet.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]