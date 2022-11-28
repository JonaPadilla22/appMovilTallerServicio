import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url:any;
  headers:any;

  constructor(private http: HttpClient, private storage: Storage) {
    this.url = environment.baseUrlAPI;
    this.inicializarToken();
  }

  async inicializarToken(){
    this.headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + await this.storage.get('TOKEN')
    );
  }
  
  getUsuarioToken() {
    return this.http.get(`${this.url}/usuarios/token`, {
      headers: this.headers,
    });
  }

  getClientes() {
    return this.http.get(`${this.url}/usuarios/clientes`, {
      headers: this.headers,
    });
  }

  getClienteById(id: string) {
    return this.http.get(`${this.url}/usuarios/${id}`, {
      headers: this.headers,
    });
  }

  registrarUsuario(form: any) {
    return this.http.post(`${this.url}/usuarios/movil`, form);
  }

  getUsuarios() {
    return this.http.get(`${this.url}/usuarios`, { headers: this.headers });
  }

  updateUser(data: any, id: any) {
    return this.http.put(`${this.url}/usuarios/${id}`, data, {
      headers: this.headers,
    });
  }

  updatePassword(id: any, oldPass: string, newPass: string) {
    return this.http.put(
      `${this.url}/usuarios/${id}/pass/${oldPass}`,
      { CONTRA: newPass },
      {
        headers: this.headers,
      }
    );
  }

  updateImageUser(id: any, img: any) {
    return this.http.post(`${this.url}/usuarios/actualizarImagen/${id}`, img, {
      headers: this.headers,
    });
  }

  getTiposPersona() {
    return this.http.get(`${this.url}/tipoPersona`, { headers: this.headers });
  }

  getTiposUsuario() {
    return this.http.get(`${this.url}/tipoUsuario`, { headers: this.headers });
  }
}
