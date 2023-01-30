from django.db import models

# Create your models here.
class Departments(models.Model):
    DepartmentId=models.AutoField(primary_key=True)
    DepartmentName=models.CharField(max_length=150)

class Employees(models.Model):
    EmployeeId=models.AutoField(primary_key=True)
    EmployeeName=models.CharField(max_length=150)
    Department=models.CharField(max_length=150)
    DateOfJoining=models.DateTimeField()
    PhotoFileName=models.CharField(max_length=150)