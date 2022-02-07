from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('items/', views.ItemViewSet.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]