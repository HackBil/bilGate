from django.db import models


class Open(models.Model):
    date = models.DateField(auto_now_add=True)


class Code(models.Model):
    code = models.CharField(max_length=64, unique=True)

class Contact(models.Model):
    phone = models.CharField(max_length=64, unique=True)
    priority = models.IntegerField(default=0)
