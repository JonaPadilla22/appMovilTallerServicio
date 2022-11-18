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
      url: 'inicioCliente', 
      icon: 'home' 
    },
    { 
      title: 'Citas', 
      url: 'citas', 
      icon: 'calendar-number' 
    },
    { 
      title: 'Historial', 
      url: 'servicios', 
      icon: 'car' 
    },
    { 
      title: 'Configuracion', 
      url: 'servicios', 
      icon: 'car' 
    }
  ];

  public appPagesTecnico = [
    { 
      title: 'Inicio', 
      url: 'inicioTecnico', 
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
  constructor() {
    this.appPages$ = this.appPagesCliente
  }
}
