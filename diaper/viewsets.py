from rest_framework import viewsets

from diaper.models import Diaper
from diaper.serializers import DiaperSerializer


class DiaperViewSet(viewsets.ModelViewSet):
    queryset = Diaper.objects.all()
    serializer_class = DiaperSerializer
