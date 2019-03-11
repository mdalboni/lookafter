from rest_framework import status
from rest_framework.response import Response

from diaper.models import Diaper
from diaper.serializers import DiaperSerializer

accepted_queries = ['size', 'model']


def list_all_diapers():
    diaper = Diaper.objects.all()
    serializer = DiaperSerializer(diaper, many=True)
    return Response({"diapers": serializer.data})


def list_queried_diapers(query, search):
    if query.lower() not in accepted_queries:
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    diaper_response = {
        "total": Diaper.objects.all().count(),
        "query": count_diaper_by_model(search) if 'model' == query.lower() else count_diaper_by_size(search)
    }
    return Response(diaper_response, status=status.HTTP_200_OK)


def count_diaper_by_model(value):
    return Diaper.objects.filter(model__iexact=value).count()


def count_diaper_by_size(value):
    return Diaper.objects.filter(size=value).count()


def remove_diaper_many(values):
    for value in values:
        remove_diaper(value)
    return Response({}, status=status.HTTP_200_OK)


def remove_diaper(value):
    return Diaper.objects.filter(id=value).delete()


def save_many(request):
    request_data = []
    for data in request.data:
        serializer = DiaperSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        request_data.append(serializer)
    for serializer in request_data:
        serializer.save()
    return Response({"success": True}, status=status.HTTP_200_OK)
