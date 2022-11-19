import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  url: string;
  // token: string | null = localStorage.getItem('TOKEN');
  // token: string =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY4ODQwNzkxfQ.7Z8wqOfOvOGeenjayIp5bLajtvvGs-3bLzW0WaGuFG0';
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) {
    this.url = environment.baseUrlAPI;
  }

  getCitasPendientes() {
    return this.http
      .get(`${this.url}/servicios/estatus/C`, {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  getTiposServicios() {
    return this.http
      .get(`${this.url}/tipoServicio`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getTiposPersona() {
    return this.http
      .get(`${this.url}/tipoPersona`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getMarcas() {
    return this.http
      .get(`${this.url}/marca`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getModelos(id: string) {
    return this.http
      .get(`${this.url}/modeloVehiculo/marca/${id}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  registrarCita(form: any) {
    return this.http.post(`${this.url}/servicios`, form);
  }

  registrarActualizacioServ(form: any) {
    return this.http.post(`${this.url}/servicios/actualizacion`, form);
  }

  actualizarCita(data: any, id_cita: number) {
    return this.http.put(`${this.url}/servicios/${id_cita}`, data);
  }
}
