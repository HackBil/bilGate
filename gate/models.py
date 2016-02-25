from django.db import models


class Open(models.Model):
    date = models.DateField(auto_now_add=True)


class Code(models.Model):
    code = models.CharField(unique=True)
