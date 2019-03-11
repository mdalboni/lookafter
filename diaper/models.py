from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# Create your models here.
class Diaper(models.Model):
    SIZES = (
        ("S", "Small"),
        ("M", "Medium"),
        ("L", "Large"),
        ("XL", "Extra Large"),
    )

    name = models.CharField(verbose_name='Name', max_length=80, blank=False)
    size = models.CharField(verbose_name='Size', max_length=9, choices=SIZES, default="M", blank=False)
    model = models.CharField(verbose_name='Model Name', max_length=50, blank=False)
