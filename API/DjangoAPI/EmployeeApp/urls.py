from django.urls import re_path
from EmployeeApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    re_path(r'^department/$',views.departmentApi),#Esta expresion dicta que una ruta sin parametros de entrada es valida, de ahi el $ que marca el final de la  ruta
    re_path(r'^department/([0-9]+)$',views.departmentApi),#Esta expresion es para aceptar un numero de uno o mas digitos
    re_path(r'^employee/$',views.employeeApi),
    re_path(r'^employee/([0-9]+)$',views.employeeApi),

    re_path(r'^SaveFile$', views.SaveFile)
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)