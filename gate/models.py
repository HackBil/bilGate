from django.db import models
from django.core.validators import RegexValidator


class Open(models.Model):
    date = models.DateField(auto_now_add=True)


class Code(models.Model):
    code = models.CharField(max_length=5, unique=True, validators=[RegexValidator(regex='^.{5}$', message='Le code doit faire 5 caractères')])
