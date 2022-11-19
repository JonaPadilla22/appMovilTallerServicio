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
  constructor(private http: HttpClient) {}

  enviarToken(token: Token): Observable<any> {
    var id = 14;
    alert(this.url);

    return this.http.post(`${this.url}/firebase/registerToken/${id}`, {
      TOKEN: token.value,
    });
  }

  // TODO: remove token of the device when the user logout from the app
  eliminarToken(token: Token) {}
}
