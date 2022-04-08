from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify
from transliterate import translit
from django.utils import timezone
from client.models import Client
import os
from django.conf import settings
#! = necessary field


class Category(models.Model):
    name = models.CharField(max_length=256, blank=True)  #! category's name
    hierarchy = models.CharField(max_length=500, blank=True)  # "Food;Meat;Beef" or such
    parent = models.ForeignKey('self', related_name='subcategories', on_delete=models.CASCADE, blank=True, null=True)
    parent_string = models.CharField(max_length=256, blank=True)  #! string representation of parent's alleged name
    is_child_a_category = models.BooleanField(default=False)  # children of it can either be items or categories, but not both
    picture = models.ImageField(blank=True, upload_to='categories')  # the kind of image that would be seen in api category grid

    def __str__(self): # method invoked when an object is printed, like print(category_obj) or in html template {{ category_obj }}
        return self.name

    def save(self, *args, **kwargs):
        if self.parent_string and self.parent is None:  # if there is a parent string but parent object is not specified (blank)
            queryset = Category.objects.filter(name=self.parent_string)
            if queryset:  # if there are objects with name=self.parent_string, acquire the first of it
                self.parent = queryset[0]
                self.parent.is_child_a_category = True  # Basically since the parent now has a subcategory, its is_child_a_category should equal True
                self.parent.save()
        if self.parent is not None:
            if self.parent.hierarchy == "":  # if parent hierarchy is an empty string, we set hierarchy to just parent name
                self.hierarchy = self.parent.name
            else:  # otherwise parent's hierarchy also takes place: "Food;Meat" + ";" + "Beef"
                self.hierarchy = self.parent.hierarchy + ";" + self.parent.name
        super(Category, self).save(*args, **kwargs)
    #def get_absolute_url(self):  # url to display on page that you can click and go to category grid

    class Meta:
        verbose_name_plural = 'categories'  # when displayed as plural (admin page), will be "categories" instead of the default "categorys"


class Item(models.Model):

    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True)  # parent category
    parent_string = models.CharField(max_length=256, blank=True)  #! "Beef"
    hierarchy = models.CharField(max_length=500, blank=True)  # "Food;Meat;Beef" or such
    name = models.CharField(max_length=256, blank=True)  #!
    slug = models.SlugField(blank=True)  # slug of item's name that will form a url to the item
    article = models.CharField(max_length=30, blank=True)  #! vendor code that we come up with
    weight = models.FloatField(blank=True, null=True)  # weight
    weight_measure_unit = models.CharField(max_length=20, default="кг")  # measure unit of weight, kg by default, could be "g"
    price = models.FloatField(default=0, blank=True)  #! price in roubles
    country = models.CharField(max_length=50, blank=True)  # manufacturer country (Belarus, etc.)
    company = models.CharField(max_length=80, blank=True)  # manufacturer company
    description = models.TextField(blank=True)
    #video, like a youtube link or url


    # def get_absolute_url(self):
    #     return reverse("item", kwargs={'company': self.company, 'article': self.article})

    # def get_cool_price(self):
    #     if self.price == -1:
    #         return "Цена не установлена"
    #     if self.price == -2:
    #         return "Цена по запросу"
    #     price = str(self.price)
    #     values = price.split(".")
    #     values[1] = values[1][:2]
    #     int_price = values[0]
    #     for i in range(3, len(int_price) + 1, 4):
    #         int_price = int_price[:-i] + " " + int_price[-i:]
    #     return int_price + " руб."

    def __str__(self):
        return self.name + "_" + self.article

    def save(self, *args, **kwargs): # what happens when an item is saved (.save() method is called)
        # if self.company:
        #     self.url = self.get_absolute_url()

        if not self.parent_string:
            parent_hierarchy = self.hierarchy  # setting up the parent to be a Category object
            parent_hierarchy = parent_hierarchy[len(parent_hierarchy) - parent_hierarchy[::-1].find(";"):]  # "Food;Meat;Beef" --> "Beef"
            self.parent_category = Category.objects.get(name=parent_hierarchy)  # Category objects get uploaded before Item objects
        else:
            self.parent_category = Category.objects.get(name=self.parent_string)

        self.slug = slugify(translit(self.name, 'ru', reversed=True))  # from cyrillic to latin so that a slug is not russian
        # if self.name:
        #     if self.name[0] != " " and self.name[:-1] != " ":
        #         self.name = " " + self.name + " "
        #     self.name_lowercase = self.name.lower()
        self.hierarchy = self.parent_category.hierarchy + ";" + self.parent_category.name
        super(Item, self).save(*args, **kwargs)
        

def get_upload_path(instance, filename):  # dynamically getting the upload path for a photo
    return os.path.join(settings.MEDIA_ROOT, "items", instance.item.hierarchy.replace(";", "/"), filename)

class Image(models.Model):
    picture = models.ImageField(blank=True, upload_to=get_upload_path)
    item = models.ForeignKey(Item, related_name='images', on_delete=models.CASCADE)  # many-to-one, many images to one item, item.images will access them

    def __str__(self):
        try:
            return self.picture.url
        except:
            return "Image " + str(self.pk)


class OrderItem(models.Model):  # the model allows you to have a count of an item in your cart, like 10 apples
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)  # when an order is finished, its order items all receive True value for that field

    def __str__(self):
        return str(self.quantity) + " of " + self.item.name

    def get_total_item_price(self):
        if self.item.price < 0:
            return 0
        return self.quantity * self.item.price

    # def get_cool_price(self):
    #     # if self.item.price == -1:
    #     #     return "Цена не установлена"
    #     # if self.item.price == -2:
    #     #     return "Цена по запросу"
    #     price = str(self.get_total_item_price())
    #     values = price.split(".")
    #     values[1] = values[1][:2]
    #     int_price = values[0]
    #     for i in range(3, len(int_price) + 1, 4):
    #         int_price = int_price[:-i] + " " + int_price[-i:]
    #     return int_price


class Order(models.Model):
    client = models.ForeignKey(Client, related_name="orders", on_delete=models.CASCADE, blank=True) # client associated with order, created when upon order completion
    date = models.DateTimeField(default=timezone.now)  # order date
    items = models.ManyToManyField(OrderItem, blank=True)  # OrderItem objects present in that order
    price = models.IntegerField(default=0)  # sum price of OrderItems
    details = models.TextField(blank=True, null=True)  # additional information provided by a buyer

    fulfilled = models.BooleanField(default=False)  # order is fulfilled and commodities are delivered
    paid = models.BooleanField(default=False)  # order was paid by a buyer

    def get_total(self):  # total price
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_item_price()
        return total

    def get_cool_price(self):
        price = str(self.get_total())
        if not "." in price:
            return price
        else:
            values = price.split(".")
            values[1] = values[1][:2]
            int_price = values[0]
            for i in range(3, len(int_price) + 1, 4):
                int_price = int_price[:-i] + " " + int_price[-i:]
            return int_price
