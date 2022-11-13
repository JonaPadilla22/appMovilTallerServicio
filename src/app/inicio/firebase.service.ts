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
    var url = Global.urlApi;
    var id = 14
    alert(url);
    // TODO: Add user to the object sent to registered the new device
    // let objetoJson = JSON.stringify({
    //   TOKEN: token.value,
    // });
    // alert("objeto: "+objetoJson);
    //var headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.post(`${url}/firebase/registerToken/${id}`, {TOKEN: token.value});   
  }

  probandoServiciosGet(){
    var request = '/manoDeObra/';
    var url = Global.urlApi + request;

    return this.http.get<ManoDeObra[]>(url);

  }

}
