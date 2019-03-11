from django.conf.urls import include, url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from diaper import views

urlpatterns = [
    path('api/diaper/', views.diaper_list),
    path('api/diaper/<int:pk>/', views.diaper_detail),
    path('api/login/', views.login),
    path('api/sample/', views.sample_api),
    path('api/auth/', views.check_authentication),
    path('sample/', views.teste),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns = format_suffix_patterns(urlpatterns)
