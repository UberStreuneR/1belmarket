from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('api/', include("market.urls"))
]