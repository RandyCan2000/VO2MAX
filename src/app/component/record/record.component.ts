import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { User } from 'src/app/Models/User';
import { ServicesService } from 'src/app/Service/services.service';
import { ListadoComponent } from '../listado/listado.component';
import { Router } from '@angular/router'

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  constructor(private dialog:MatDialog,private Services: ServicesService,private navigation:Router) { }

  public ListadoFechas :String[] = []
  private User:User

  ngOnInit(): void {
    this.User = JSON.parse(sessionStorage.getItem("USRLOG"))
    if(this.User){
      this.Services.GetFechasUser(this.User.Username).subscribe(
        result =>{
          this.ListadoFechas = result
        }
      )
    }else{
      //Redirect
    }
  }


  //Sirve pero no es necesario
  public OpenList(VariableEntrada:string){
    const DialogRef = this.dialog.open(ListadoComponent,{
      width:"450px",
      data:{data:VariableEntrada}
    })
    DialogRef.afterClosed().subscribe(
      result=>{
        
      }
    )
  }

  public RedirectToReporte(Fecha:String){
    this.navigation.navigate(["/",Fecha])
  }

}
