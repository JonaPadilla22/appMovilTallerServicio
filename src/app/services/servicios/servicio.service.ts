import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url: string;
  headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem("TOKEN"));
  constructor(private http: HttpClient) { 
    this.url = environment.baseUrlAPI; 
  }

  getServicioById(id: string){
    return this.http
    .get(`${this.url}/servicios/${id}`, {headers: this.headers}).pipe(
      map((res: any)=>{
        return res;
      })
    );
  }

  getServiciosPendientes(){
    return this.http
    .get(`${this.url}/servicios/pendientes`, {headers: this.headers}).pipe(
      map((res: any)=>{
        return res;
      })
    );
  }

  getServiciosTecnico(id: string){
    return this.http
    .get(`${this.url}/servicios/tecnico/${id}`, {headers: this.headers}).pipe(
      map((res: any)=>{
        return res;
      })
    );
  }
  
  getServiciosCliente(id: string){
    return this.http
    .get(`${this.url}/servicios/cliente/${id}`, {headers: this.headers}).pipe(
      map((res: any)=>{
        return res;
      })
    );
  }

  getServiciosTerminados(){
    return this
            .http
            .get(`${this.url}/servicios/estatus/T`, {headers: this.headers}).pipe(
              map(res=>res)
            );
  }

  getEstatus(){
    return this
            .http
            .get(`${this.url}/servicios/estatus`, {headers: this.headers}).pipe(
              map(res=>res)
            );
  }

  getDetalleServicio(id: string){
    return this
            .http
            .get(`${this.url}/servicios/detalle/${id}`, {headers: this.headers}).pipe(
              map(res=>res)
            );
  } 

  getActualizacionesServicios(id: string){
    return this
            .http
            .get(`${this.url}/servicios/actualizacion/${id}`, {headers: this.headers}).pipe(
              map(res=>res)
            );
  }

  actualizarEstatus(formActServ: FormData){
    return this.http.post(`${this.url}/servicios/actualizacion`, formActServ, {headers: this.headers});
  }

  insertarDetalleServ(formDet: FormData){
    return this.http.post(`${this.url}/servicios/detalle`, formDet, {headers: this.headers});
  }

}
