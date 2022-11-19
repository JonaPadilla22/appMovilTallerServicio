import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.baseUrlAPI;

  constructor(private http: HttpClient) {}

  validateLogin(form: any) {
    console.log(form);
    return this.http.post(`${this.url}/auth/login`, form);
  }
}
