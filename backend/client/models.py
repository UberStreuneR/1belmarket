from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    email = models.CharField(max_length=200, null=True, blank=True)
    device = models.CharField(max_length=50, null=True, blank=True) # device cookie associated with that client
    verified = models.BooleanField(default=False)

    def __str__(self):
        if self.name:
            name = self.name
        else:
            name = self.device
        return str(name)

