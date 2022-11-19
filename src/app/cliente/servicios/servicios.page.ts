import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPageCliente implements OnInit {
  public page: string;
  constructor() { }

  ngOnInit() {
    this.page = "Servicios";
  }

}
