import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public appPages$ = [];
  type: string;

  appPagesCliente: any;
  labels: any;

  constructor() {
    this.appPages$ = this.appPagesCliente;
  }

  ngOnInit() {
    let dataUser = JSON.parse(localStorage.getItem('USUARIO'));
    if (dataUser.TIPO_USUARIO.ID != 4) {
      this.type = 'employee';
    } else {
      this.type = 'client';
    }

    this.appPagesCliente = [
      {
        title: 'Inicio',
        url: `/${this.type}/inicio`,
        icon: 'home',
      },
      {
        title: 'Citas',
        url: `/${this.type}/citas`,
        icon: 'calendar-number',
      },
      {
        title: 'Historial',
        url: `/${this.type}/servicios`,
        icon: 'today',
      },
    ];

    this.labels = [
      {
        title: 'Cambiar Contraseña',
        url: `/${this.type}/servicios`,
        icon: 'lock-closed',
      },
      {
        title: 'Cambiar Imagen',
        url: `/${this.type}/servicios`,
        icon: 'image',
      },
      {
        title: 'Cerrar Sesión',
        icon: 'log-out',
      },
    ];
    
    this.appPages$ = this.appPagesCliente;
  }
}
