import { Component, OnInit, ViewChild } from '@angular/core';
import { FormLoginComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected isLogin: boolean = true;

  @ViewChild(FormLoginComponent) loginForm: any;
  @ViewChild(RegisterFormComponent) registerForm: any;
  @ViewChild('btnChangeForms') btnChangeForms: any;
  
  constructor() {}

  ngOnInit() {}

  handleRegiterFormChange(ev: any) {
    let parent: any;
    let clicked: any;

    parent = ev.target.parentNode;
    clicked = ev.target;

    if (!this.isLogin) {
      clicked.classList.add('register');
      parent.classList.remove('login');
    } else {
      clicked.classList.remove('register');
      parent.classList.add('login');
    }
    this.isLogin = !this.isLogin;
  }

  async handleSubmit() {
    if (this.isLogin) {
      this.loginForm.validateLogin();
    }

    if (!this.isLogin) {
      let x = await this.registerForm.validateRegister();
      console.log(x)
      x == 1 && this.btnChangeForms.el.click();
    }
  }
}
