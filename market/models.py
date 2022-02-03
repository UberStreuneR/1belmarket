from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify
from transliterate import translit
from django.utils import timezone
from client.models import Client


class Item(models.Model):

    parent_category = models.CharField(max_length=200, blank=True)  # parent category
    hierarchy = models.CharField(max_length=500, blank=True)  # "Food;Meat;Beef" or such
    name = models.CharField(max_length=256, blank=True)
    slug = models.SlugField(blank=True)  # slug of item's name that will form a url to the item
    article = models.CharField(max_length=30, blank=True)  # vendor code that we come up with
    weight = models.FloatField(blank=True, null=True)  # weight
    weight_measure_unit = models.CharField(max_length=20, default="кг")  # measure unit of weight, kg by default, could be "g"
    price = models.FloatField(default=0, blank=True)  # price in roubles
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

    def save(self, *args, **kwargs): # what happens when an item is saved (.save() method is called)
        # if self.company:
        #     self.url = self.get_absolute_url()
        self.slug = slugify(translit(self.name, 'ru', reversed=True))  # from cyrillic to latin so that a slug is not russian
        # if self.name:
        #     if self.name[0] != " " and self.name[:-1] != " ":
        #         self.name = " " + self.name + " "
        #     self.name_lowercase = self.name.lower()
        super(Item, self).save(*args, **kwargs)
        

class Image(models.Model):
    picture = models.ImageField(blank=True)
    item = models.ForeignKey(Item, related_name='images', on_delete=models.CASCADE)  # many-to-one, many images to one item, item.images will access them


class Category(models.Model):
    name = models.CharField(max_length=256, blank=True)  # category's name
    hierarchy = models.CharField(max_length=500, blank=True)  # "Food;Meat;Beef" or such
    is_child_a_category = models.BooleanField(default=True)  # children of it can either be items or categories, but not both
    picture = models.ImageField(blank=True)  # the kind of image that would be seen in market category grid

    def __str__(self): # method invoked when an object is printed, like print(category_obj) or in html template {{ category_obj }}
        return self.name

    #def get_absolute_url(self):  # url to display on page that you can click and go to category grid

    class Meta:
        verbose_name_plural = 'categories'  # when displayed as plural (admin page), will be "categories" instead of the default "categorys"


class OrderItem(models.Model):  # the model allows you to have a count of an item in your cart, like 10 apples
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)  # when an order is finished, its order items all receive True value for that field

    def __str__(self):
        return f"{self.quantity} of {self.item.name}"

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

class File(models.Model):
    order = models.ForeignKey(Order, related_name='files', on_delete=models.CASCADE)  # order to which a file is associated
    name = models.CharField(blank=True, null=True, max_length=200)  # filename
    file = models.FileField(blank=True, null=True, upload_to='static/cart_files/')  # literal file path
