import { Injectable } from '@angular/core';

//importaciones manuales
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';//Este es para obtener respuestas asincronas

@Injectable({
  providedIn: 'root'
})
export class SharedService 
{
  readonly APIUrl="http://127.0.0.1:8000";//Direccion de API django
  readonly PhotoUrl="http://127.0.0.1:8000/media/"//Direccion archivos
  constructor(private Http:HttpClient) { }

  getDeptList():Observable<any[]>
  {
    return this.Http.get<any[]>(this.APIUrl+'/department/');
  }
  addDepartment(val:any)
  {
    return this.Http.post(this.APIUrl+'/department/',val);
  }
  updateDepartment(val:any)
  {
    return this.Http.put(this.APIUrl+'/department/',val);
  }
  deleteDepartment(val:any)
  {
    return this.Http.delete(this.APIUrl+'/department/'+val);
  }

  getEmpList():Observable<any[]>
  {
    return this.Http.get<any[]>(this.APIUrl+'/employee/');
  }
  addEmployee(val:any)
  {
    return this.Http.post(this.APIUrl+'/employee/',val);
  }
  updateEmployee(val:any)
  {
    return this.Http.put(this.APIUrl+'/employee/',val);
  }
  deleteEmployee(val:any)
  {
    return this.Http.delete(this.APIUrl+'/employee/'+val);
  }

  UploadPhoto(val:any)
  {
    return this.Http.post(this.APIUrl+'/SaveFile',val);
  }

  getAllDepartmentNames():Observable<any[]>
  {
    return this.Http.get<any[]>(this.APIUrl+'/department/');
  }
}
