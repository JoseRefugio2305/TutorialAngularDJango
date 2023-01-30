import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent {
  constructor(private service:SharedService){}

  EmployeeList:any=[];//Contendra la lista de los departamentos, se llenara con el metodo getDeptList() de shared.service.ts

  //Variables usadas en el modal, para saber si se esta agregando o editando informaicon
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  ngOnInit():void{//Este es el primer metodo que se ejecuta al llamar a este modulo
    this.refreshEmpList();
  }

  //Eventos llamados en modal de agregar editar departamento
  addClick(){//Este evento es llamado cuando se da en clic de agregar departamento 
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"user.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm("Are you sure??"))
    {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  //Llenado de lista de departamentos
  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }
}
