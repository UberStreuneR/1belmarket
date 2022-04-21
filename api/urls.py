from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('items/', views.ItemViewSet.as_view()),
    path('items-search/<str:key>', views.ItemSearchViewSet.as_view()),
    path('categories/', views.CategoryViewSet.as_view()),
    path('categories-search/<str:key>', views.CategorySearchViewSet.as_view()),
    path('categories-children/<str:name>', views.CategoryChildrenViewSet.as_view()),
    path('orders/', views.OrderViewSet.as_view()),
    path('upload-items/', views.UploadItemsFromExcel.as_view(), name='upload-items'),
    path('upload-categories/', views.UploadCategoriesFromExcel.as_view(), name='upload-categories'),
    path('delete-items/', views.DeleteItemsView.as_view(), name='delete-items'),
    path('delete-categories/', views.DeleteCategoriesView.as_view(), name='delete-categories'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]