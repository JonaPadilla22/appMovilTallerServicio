import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

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

  ngOnInit() {}

}
