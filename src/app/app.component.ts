import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages$ = [];
  private type: string = "client";

  public appPagesCliente = [
    { 
      title: 'Inicio', 
      url: `/${this.type}/inicio`, 
      icon: 'home' 
    },
    { 
      title: 'Citas', 
      url: `/${this.type}/citas`, 
      icon: 'calendar-number' 
    },
    { 
      title: 'Historial', 
      url: `/${this.type}/servicios`, 
      icon: 'car' 
    },
    { 
      title: 'Configuracion', 
      url: `/${this.type}/servicios`, 
      icon: 'car' 
    }
  ];
  constructor() {
    this.appPages$ = this.appPagesCliente
  }
}
