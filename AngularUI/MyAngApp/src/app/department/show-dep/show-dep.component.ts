import { Component } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent {
  constructor(private service:SharedService){}

  DepartmentList:any=[];//Contendra la lista de los departamentos, se llenara con el metodo getDeptList() de shared.service.ts

  //Variables usadas en el modal, para saber si se esta agregando o editando informaicon
  ModalTitle:string="";
  ActivateAddEditDepComp:boolean=false;
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  ngOnInit():void{//Este es el primer metodo que se ejecuta al llamar a este modulo
    this.refreshDepList();
  }

  //Eventos llamados en modal de agregar editar departamento
  addClick(){//Este evento es llamado cuando se da en clic de agregar departamento 
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  editClick(item:any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item:any){
    if(confirm("Are you sure??"))
    {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      });
    }
  }

  //Llenado de lista de departamentos
  refreshDepList(){
    this.service.getDeptList().subscribe(data=>{
      this.DepartmentList=data;
    });
  }

  FilterFn(){
    var DepartmentIdFilter=this.DepartmentIdFilter;
    var DepartmentNameFilter=this.DepartmentNameFilter;
    
    this.DepartmentList=this.DepartmentListWithoutFilter.filter(function (el:any){
      
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:string,asc:boolean){
    alert(prop+" "+asc);
    this.DepartmentList=this.DepartmentListWithoutFilter.sort(function (a:any,b:any){
      
      if(asc)
      {
        
        return (a[prop]>b[prop])? 1 : ((a[prop]<b[prop]) ? -1 : 0);
      }
      else
      {
        return (b[prop]>a[prop])? 1 : ((b[prop]<a[prop]) ? -1 : 0);
      }
    })
  }

}
