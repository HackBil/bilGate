from django.conf.urls import url
from gate import views


urlpatterns = [
    url(r'^open$', views.open),
    url(r'^twilio$', views.twilioResponse),
    url(r'^$', views.index),
]
