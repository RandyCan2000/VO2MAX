import { Component, OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public Hora_Tiempo_Real = ""
  private IntervalTime = null
  constructor() { }
  ngOnDestroy(): void {
    clearInterval(this.IntervalTime)
  }

  ngOnInit(): void {
    this.IntervalTime=setInterval(()=>{
      const Hora = new Date()
      this.Hora_Tiempo_Real = `${Hora.getHours()>12? Hora.getHours()-12:Hora.getHours()}:${Hora.getMinutes()<10?"0"+Hora.getMinutes():Hora.getMinutes()}:${Hora.getSeconds()<10?"0"+Hora.getSeconds():Hora.getSeconds()} ${Hora.getHours()>12?"PM":"AM"}`
    },1000)
  }

  public Click(NumHtmlDiv:number){
    const Arreglo_Items = document.getElementsByClassName("nav-item")
    let element:HTMLDivElement
    for (let index = 0; index < Arreglo_Items.length; index++) {
      element = Arreglo_Items[index] as HTMLDivElement
      element.className = "nav-item"
    }
    Arreglo_Items[NumHtmlDiv].className = "nav-item active"
  }

  public CloseSesion(){
    sessionStorage.removeItem("USRLOG")
  }

}
