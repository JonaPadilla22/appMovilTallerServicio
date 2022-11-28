import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class RefaccionService {
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

  getRefactions() {
    return this.http
      .get(`${this.url}/refacciones`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  postRefaction(form: any) {
    return this.http.post(`${this.url}/refacciones`, form, {
      headers: this.headers,
    });
  }

  updateRefaction(data: any, id: any) {
    return this.http.put(`${this.url}/refacciones/${id}`, data, {
      headers: this.headers,
    });
  }

  getTypeRefactions() {
    return this.http
      .get(`${this.url}/tipoRefaccion`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  // Workforce

  getWorkforce() {
    return this.http
      .get(`${this.url}/manoDeObra`, { headers: this.headers })
      .pipe(map((res) => res));
  }
}
