import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected isLogin: boolean = true;

  constructor() {}

  ngOnInit() {}

  handleRegiterFormChange(ev: any) {
    let parent = ev.target.parentNode;
    let clicked = ev.target;
    if(!this.isLogin){
      clicked.classList.add("register");
      parent.classList.remove("login");
    }else{
      clicked.classList.remove("register");
      parent.classList.add("login");
    }
    this.isLogin = !this.isLogin;
  }
}
