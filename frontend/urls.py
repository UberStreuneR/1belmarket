from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('market/', index),
    path('api/', include('market.urls'))

]