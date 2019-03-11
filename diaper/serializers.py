from rest_framework import serializers

# Serializers define the API representation.
from diaper.models import Diaper


class DiaperSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Diaper
        fields = ('id','name', 'model', 'size')
