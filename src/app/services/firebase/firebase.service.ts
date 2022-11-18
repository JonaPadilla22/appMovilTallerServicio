import { Injectable } from '@angular/core';
import { Token } from '@capacitor/push-notifications';
import { Observable } from 'rxjs';
import { Global } from 'src/app/Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  enviarToken(token: Token): Observable<any> {
    var url = Global.urlApi;
    var id = 14;
    alert(url);

    return this.http.post(`${url}/firebase/registerToken/${id}`, {
      TOKEN: token.value,
    });
  }

  // TODO: remove token of the device when the user logout from the app
  eliminarToken(token: Token) {}
}
