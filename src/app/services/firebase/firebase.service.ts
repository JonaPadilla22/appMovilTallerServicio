import { Injectable } from '@angular/core';
import { Token } from '@capacitor/push-notifications';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  url = environment.baseUrlAPI;
  headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('TOKEN')
  );
  token_notif: string = localStorage.getItem('TOKEN_NOTIF');
  // id_user = JSON.parse(localStorage.getItem('USUARIO')).ID;
  
  constructor(private http: HttpClient) {}

  enviarToken(token: Token, id: string): Observable<any> {
    return this.http.post(`${this.url}/firebase/registerToken/${id}`, {
      TOKEN: token.value,
    });
  }

  eliminarToken(): Observable<any> {
    return this.http.post(`${this.url}/firebase/deleteToken`, {
      TOKEN: this.token_notif,
    });
  }
}
