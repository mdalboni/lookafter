from django.contrib.auth import authenticate
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND)

from diaper.controllers import diaper as diaper_controller
from diaper.models import Diaper
from diaper.serializers import DiaperSerializer


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key,
                     'user': {
                         "name": user.first_name,
                         "last_login": user.last_login,
                         "email": user.email
                     }},
                    status=HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def sample_api(request):
    data = {'sample_data': 123}
    return Response(data, status=HTTP_200_OK)


def teste(request):
    template = loader.get_template("diaper/index.html")
    return HttpResponse(template.render())


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
@api_view(['GET'])
def check_authentication(request):
    token = request.auth.key
    if not token:
        return Response(None, status=HTTP_401_UNAUTHORIZED)
    try:
        token = Token.objects.get(key=request.auth.key)
        return Response({
            "token": token.pk,
            "user": {
                "name": token.user.first_name,
                "last_login": token.user.last_login,
                "email": token.user.email
            }
        }, status=HTTP_200_OK)
    except Exception:
        return Response(None, status=HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def diaper_list(request):
    """
    List all diapers, or create a new diaper.
    """
    if request.method == 'GET':
        return diaper_controller.list_all_diapers()
    elif request.method == 'POST':
        query = request.data.get('query')
        search = request.data.get('search')
        if query and search:
            return diaper_controller.list_queried_diapers(query, search)
        return Response(None, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        delete_list = request.data.get('diapers')
        return diaper_controller.remove_diaper_many(delete_list)
    elif request.method == 'PUT':
        serializer = DiaperSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def diaper_detail(request, pk):
    """
    Retrieve, update or delete a diaper.
    """
    try:
        diaper = Diaper.objects.get(pk=pk)
    except Diaper.DoesNotExist:
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DiaperSerializer(diaper)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DiaperSerializer(diaper, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        diaper.delete()
        return Response({}, status=status.HTTP_200_OK)
