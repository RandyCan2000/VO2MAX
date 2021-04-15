import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { VO2MAX } from '../Models/VO2MAX';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url:string ="http://localhost:4000"

  constructor(private http:HttpClient) { }

  public GetOneUser(Username:String,Password:String):Observable<User>{
    return this.http.get<User>(`${this.url}/GetOneUser/${Username}/${Password}`)
  }

  public GetVO2MAXMed(Username:String,Fecha:String):Promise<VO2MAX[]>{
    return this.http.get<VO2MAX[]>(`${this.url}/GetVO2MAXMediciones/${Username}/${Fecha.replace(/\//gi,"_")}`).toPromise()
  }

  public GetFechasUser(Username:String):Observable<String[]>{
    
    return this.http.get<String[]>(`${this.url}/FechasUserVO2MAX/${Username}`)
  }

  public GetFechasLive():Promise<any>{
    return this.http.get<any>(`${this.url}/FechasUserLiveVO2MAX`).toPromise()
  }
}
