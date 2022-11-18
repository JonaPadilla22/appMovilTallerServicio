import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPageTecnico implements OnInit {
  public page: string;
  public token: string;

  constructor() {}

  ngOnInit() {
    this.page = 'Inicio tecnico';

  }
}
