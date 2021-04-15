import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Service/services.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Username:String=""
  public Password:String=""

  constructor(private service:ServicesService, private router:Router) {
    this.Password=""
    this.Username=""
  }

  ngOnInit(): void {
  }

  public Login(){
    this.service.GetOneUser(this.Username,this.Password).subscribe(
      result=>{
        if(result){
          sessionStorage.setItem("USRLOG",JSON.stringify(result))
          this.router.navigate(["/","Live"])
          //redirect
        }else{
          alert("Usuario No Encontrado")
          this.Password=""
        }
      }
    )
  }

}
