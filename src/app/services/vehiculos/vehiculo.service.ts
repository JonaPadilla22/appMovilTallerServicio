import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  url = environment.baseUrlAPI;
  headers: any;

  constructor(private http: HttpClient, private storage: Storage) {
    this.url = environment.baseUrlAPI;
    this.inicializarToken();
  }

  async inicializarToken() {
    this.headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + (await this.storage.get('TOKEN'))
    );
  }

  getVehiculos() {
    return this.http
      .get(`${this.url}/vehiculos`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  registrarVeh(form: any) {
    return this.http.post(`${this.url}/vehiculos`, form, {
      headers: this.headers,
    });
  }

  getVehiculosByCliente(id: string) {
    return this.http
      .get(`${this.url}/vehiculos/cliente-veh/` + id, { headers: this.headers })
      .pipe(map((res) => res));
  }
}
