import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-serv-cliente',
  templateUrl: './detalle-serv-cliente.page.html',
  styleUrls: ['./detalle-serv-cliente.page.css'],
})
export class DetalleServClientePage implements OnInit {
  @Input() serv: any;
  isModalOpen = false;

  url = environment.baseUrlAPI + "/usuarios/";

  constructor() { }

  ngOnInit() {
  }

  abrirChat(isOpen: boolean){
    this.isModalOpen = isOpen; 
  }

}
