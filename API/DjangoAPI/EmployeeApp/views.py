from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt #Usaremos esto para permitir que otros doinios accedan a los metodos API, por otros dominios nos referimos al front-end de angular
from rest_framework.parsers import JSONParser #Necesaria para convetir modelos a JSON y viceversa
from django.http.response import JsonResponse

from django.core.files.storage import default_storage #Libreria necesaria para subir archivos de imagenes

from .models import Employees, Departments
from .serializers import EmployeeSerializer, DepartmentSerializer

# Create your views here.
@csrf_exempt
def departmentApi(request, id=0):
    if(request.method=='GET'):#Obtener informacion
        departments=Departments.objects.all()
        dpt_Serial=DepartmentSerializer(departments, many=True)
        return JsonResponse(dpt_Serial.data, safe=False)#Con safe=False se le esta diciendo a django que lo que estamos tratando de convertir a formato JSON es en relidad un formato valido para convertir y estamos si todavia hay algun problema
    elif(request.method=='POST'):#Agregar informacion
        dpt_data=JSONParser().parse(request)
        dpt_Serial=DepartmentSerializer(data=dpt_data)
        if dpt_Serial.is_valid():
            dpt_Serial.save()
            return JsonResponse("Agregado Correctamente!!!", safe=False)
        return JsonResponse("Error al intentar agregar los datos", safe=False)
    elif(request.method=='PUT'):#Actualizar informacion
        department_data=JSONParser().parse(request)
        department=Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        dpt_Serial=DepartmentSerializer(department, data=department_data)#Para actualizar informacion, al dato que nos retorna la consulta le agregamos la informacion que recibimos en la peticion
        if dpt_Serial.is_valid():
            dpt_Serial.save()
            return JsonResponse("Actualizado Correctamente!!!", safe=False)
        return JsonResponse("Error al actualizar", safe=False)
    elif(request.method=='DELETE'):#Eliminar informacion
        department=Departments.objects.get(DepartmentId=id)#usamos el id que se obtiene de la url
        department.delete()
        return JsonResponse("Eliminado Correctamente!!!", safe=False)


@csrf_exempt
def employeeApi(request, id=0):
    if(request.method=='GET'):#Obtener informacion
        employees=Employees.objects.all()
        emp_Serial=EmployeeSerializer(employees, many=True)
        return JsonResponse(emp_Serial.data, safe=False)#Con safe=False se le esta diciendo a django que lo que estamos tratando de convertir a formato JSON es en relidad un formato valido para convertir y estamos si todavia hay algun problema
    elif(request.method=='POST'):#Agregar informacion
        emp_data=JSONParser().parse(request)
        emp_Serial=EmployeeSerializer(data=emp_data)
        if emp_Serial.is_valid():
            emp_Serial.save()
            return JsonResponse("Agregado Correctamente!!!", safe=False)
        return JsonResponse("Error al intentar agregar los datos", safe=False)
    elif(request.method=='PUT'):#Actualizar informacion
        employee_data=JSONParser().parse(request)
        employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
        emp_Serial=EmployeeSerializer(employee, data=employee_data)#Para actualizar informacion, al dato que nos retorna la consulta le agregamos la informacion que recibimos en la peticion
        if emp_Serial.is_valid():
            emp_Serial.save()
            return JsonResponse("Actualizado Correctamente!!!", safe=False)
        return JsonResponse("Error al actualizar", safe=False)
    elif(request.method=='DELETE'):#Eliminar informacion
        employee=Employees.objects.get(EmployeeId=id)#usamos el id que se obtiene de la url
        employee.delete()
        return JsonResponse("Eliminado Correctamente!!!", safe=False)

#Subir imagen
@csrf_exempt
def SaveFile(request):
    file=request.FILES["uploadedFile"]
    file_name=default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)