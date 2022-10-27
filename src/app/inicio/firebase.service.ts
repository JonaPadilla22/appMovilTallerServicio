import { Injectable } from '@angular/core';
import { Token } from '@capacitor/push-notifications';
import { Observable } from 'rxjs';
import { Global } from '../Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ManoDeObra } from './mano-de-obra';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  
  constructor(private http: HttpClient) {}

  enviarToken(token: Token): Observable<any> {
    var request = '/firebase/notification';
    var url = Global.urlApi + request;
    alert(url);
    // TODO: Add user to the object sent to registered the new device
    let objetoJson = JSON.stringify({
      token: token.value,
    });
    alert(objetoJson);
    var headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.post<any>(url, objetoJson, { headers: headers });
  }

  probandoServiciosGet(){
    var request = '/manoDeObra/';
    var url = Global.urlApi + request;

    return this.http.get<ManoDeObra[]>(url);

  }

}
