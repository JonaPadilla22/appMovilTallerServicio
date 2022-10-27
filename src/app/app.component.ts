import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { 
      title: 'Inicio', 
      url: 'inicio', 
      icon: 'home' 
    },
    { 
      title: 'Citas', 
      url: 'citas', 
      icon: 'calendar-number' 
    },
    { 
      title: 'Servicios', 
      url: 'servicios', 
      icon: 'car' 
    }
  ];
  constructor() {}
}
