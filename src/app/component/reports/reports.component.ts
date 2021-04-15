import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphlineComponent } from '../graphline/graphline.component';
import { ActivatedRoute } from '@angular/router'
import { ServicesService } from 'src/app/Service/services.service';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router'
import { VO2MAX } from 'src/app/Models/VO2MAX';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild("Graph") Graph:GraphlineComponent
  private User:User
  private Fecha:String
  private ListadoDatos:VO2MAX[] = []
  private Interval:any
  private Seleccionado:any

  public VolOxigeno = {
    MaxEx:0,
    MinEx:0,
    MaxIn:0,
    MinIn:0,
    PromEx:0,
    PromIn:0
  }

  constructor(private activeroute:ActivatedRoute,private service:ServicesService,private route:Router) {
    this.User=JSON.parse(sessionStorage.getItem("USRLOG"))
    if(!this.User){
      this.route.navigate(["/","Login"])
    }
  }



  async ngOnInit(): Promise<void> {
    this.Seleccionado="MEDICIONES"
    if(this.activeroute.snapshot.params.Fecha){
      //Fecha Especifica
      
      await this.service.GetFechasLive().then(
        result=>{
          this.Fecha = result.FechaCompleta
        }
      )
      
      if(this.Fecha == this.activeroute.snapshot.params.Fecha){
        this.route.navigate(["/","Live"])
      }
      this.Fecha = this.activeroute.snapshot.params.Fecha
      await this.GetAllRegistros()
      console.log("HOLA")
      this.UpdateGraphMediciones()
    }else{
      //live
      await this.service.GetFechasLive().then(
        result=>{
          this.Fecha = result.FechaCompleta.replace(/\//gi,"_")
        }
      )
      this.Interval=setInterval(async ()=>{
        await this.GetAllRegistros()
        if(this.Seleccionado == "MEDICIONES"){
          this.UpdateGraphMediciones()
        }else{
          this.SumatoriaVolumenes()
        }
        if(this.route.url != "/Live"){
          clearInterval(this.Interval)
        }
        
      },500)
    }
  }

  private async GetAllRegistros():Promise<any>{
    await this.service.GetVO2MAXMed(this.User.Username, this.Fecha).then(
        data=>{
          console.log("Then");
          this.ListadoDatos = data
        }
      )
  }

  public SumatoriaVolumenes(){
    this.Seleccionado="VO2MAX"
    if(this.ListadoDatos.length>0){
      let contadorInhalado:number = 0
      let contadorExhalado:number = 0
      let SumadorInhalado:number = 0
      let SumadorExhalado:number = 0
      for (let index = 0; index < this.ListadoDatos.length; index++) {
        if(this.ListadoDatos[index].Tipo == "2"){
          contadorInhalado++
          SumadorInhalado = Number(this.ListadoDatos[index].Volumen)
        }else if(this.ListadoDatos[index].Tipo == "1"){
          contadorExhalado++
          SumadorExhalado = Number(this.ListadoDatos[index].Volumen)
        }
      }
      let CalculoVO2MAXInhalado = ((SumadorInhalado/contadorInhalado)/5)/(Number(this.ListadoDatos[0].Peso)*0.453592)
      let CalculoVO2MAXExhalado = ((SumadorExhalado/contadorExhalado)/5)/(Number(this.ListadoDatos[0].Peso)*0.453592)
      this.Graph.lineChartData[0].data = []
      this.Graph.lineChartLabels=[]

      this.Graph.lineChartData[0].data.push(0)
      this.Graph.lineChartData[0].data.push(CalculoVO2MAXInhalado)
      this.Graph.lineChartData[0].data.push(-CalculoVO2MAXExhalado)
      this.Graph.lineChartData[0].data.push(0)
      this.Graph.lineChartLabels.push("")
      this.Graph.lineChartLabels.push("Inhalado")
      this.Graph.lineChartLabels.push("Exhalado")
      this.Graph.lineChartLabels.push("")
      this.Graph.lineChartData[0].label = "VO2MAX"
    }
  }

  public UpdateGraphMediciones(){
    this.Seleccionado="MEDICIONES"
    this.Graph.lineChartData[0].data = []
    this.Graph.lineChartLabels=[]
    this.Graph.lineChartData[0].label = "Mediciones"
    for (let index = 0; index < this.ListadoDatos.length; index++) {
      const element = this.ListadoDatos[index];
      if(element.Tipo == "0"){
        this.Graph.lineChartData[0].data.push(-Number(element.Volumen))
      }else if(element.Tipo == "1"){
        this.Graph.lineChartData[0].data.push(Number(element.Volumen))
      }else{
        this.Graph.lineChartData[0].data.push(0)
      }
      this.Graph.lineChartLabels.push(index.toString())
    }
    this.VolOxigeno.MaxEx=this.ObtenerMax(this.ListadoDatos,"0")
    this.VolOxigeno.MinEx=this.ObtenerMin(this.ListadoDatos,"0",this.VolOxigeno.MaxEx)
    this.VolOxigeno.MaxIn=this.ObtenerMax(this.ListadoDatos,"1")
    this.VolOxigeno.MinIn=this.ObtenerMin(this.ListadoDatos,"1",this.VolOxigeno.MaxIn)
    this.VolOxigeno.PromEx = this.Promedio(this.ListadoDatos,"0")
    this.VolOxigeno.PromIn = this.Promedio(this.ListadoDatos,"1")
  }

  private ObtenerMax(ListaVal:VO2MAX[],tipo:String){
    let ret = 0
    ListaVal.forEach(element => {
      if(element.Tipo==tipo){
        if(element.Volumen> ret){
          ret = Number(element.Volumen)
        }
      }
    });
    return ret
  }

  private ObtenerMin(ListaVal:VO2MAX[],tipo:String,Max:number){
    let ret = Max
    ListaVal.forEach(element => {
      if(element.Tipo==tipo){
        if(element.Volumen < ret){
          ret = Number(element.Volumen)
        }
      }
    });
    return ret
  }

  private Promedio(ListaVal:VO2MAX[],tipo:String){
    let ret = 0
    let contador = 0
    ListaVal.forEach(element => {
      if(element.Tipo == tipo){
        ret += Number(element.Volumen)
        contador++
      }
    });
    return ret/contador
  }

}
