import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-serv-cliente',
  templateUrl: './detalle-serv-cliente.page.html',
  styleUrls: ['./detalle-serv-cliente.page.css'],
})
export class DetalleServClientePage implements OnInit {
  @Input() serv: any;
  isModalOpen = false;

  constructor() { }

  ngOnInit() {
  }

  abrirChat(isOpen: boolean){
    this.isModalOpen = isOpen; 
  }

}
