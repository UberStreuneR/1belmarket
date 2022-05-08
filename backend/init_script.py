from django.contrib.auth import get_user_model
from django.conf import settings
from api.models import Item, Category
import os


superuser_email = os.environ.get("SUPERUSER_EMAIL")
superuser_login = os.environ.get("SUPERUSER_LOGIN", "admin")
superuser_password = os.environ.get("SUPERUSER_PASSWORD", "admin")

User = get_user_model()
user = User.objects.filter(email=superuser_email)

if user.exists():
    user_admin = user.first()
    user_admin.set_password(superuser_password)
    user_admin.save()
else:
    User.objects.create_superuser(
        superuser_login,
        superuser_email,
        superuser_password
    )

categories_filename = 'CategoriesSample.xlsx'
items_filename = 'ItemsSample.xlsx'

if not Category.objects.exists():
    Category.objects.create_from_excel(os.path.join(settings.DEFAULT_IMAGE_PATH, categories_filename))
    Item.objects.create_from_excel(os.path.join(settings.DEFAULT_IMAGE_PATH, items_filename))
