import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  url = environment.baseUrlAPI;
  headers:any;
  
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

  sendNotificationUser(id: string, title: string, body: string) {
    return this.http.post(
      `${this.url}/firebase/notification/${id}`,
      {
        NOTIFICATION: {
          title: title,
          body: body,
        },
      },
      { headers: this.headers }
    );
  }
}
