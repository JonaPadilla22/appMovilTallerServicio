import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages$ = [];
  public appPagesCliente = [
    { 
      title: 'Inicio', 
      url: '/employee/inicio', 
      icon: 'home' 
    },
    { 
      title: 'Citas', 
      url: '/employee/citas', 
      icon: 'calendar-number' 
    },
    { 
      title: 'Historial', 
      url: '/employee/servicios', 
      icon: 'car' 
    },
    { 
      title: 'Configuracion', 
      url: '/employee/servicios', 
      icon: 'car' 
    }
  ];
  constructor() {
    this.appPages$ = this.appPagesCliente
  }
}
