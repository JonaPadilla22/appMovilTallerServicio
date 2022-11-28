import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicioService } from 'src/app/services/servicios/servicio.service';

@Component({
  selector: 'app-detalle-serv-cliente',
  templateUrl: './detalle-serv-cliente.page.html',
  styleUrls: ['./detalle-serv-cliente.page.css'],
})
export class DetalleServClientePage implements OnInit {
  @Input() serv: any;
  isModalOpen = false;
  detalle_serv: any;
  actualizaciones_serv: any;
  total: any;
  url = environment.baseUrlAPI + "/usuarios/";

  constructor(private servService: ServicioService) { }

  async ngOnInit() {
    this.detalle_serv = await this.servService
      .getDetalleServicio(this.serv.ID_SERVICIO)
      .toPromise();
    this.actualizaciones_serv = await this.servService
      .getActualizacionesServicios(this.serv.ID_SERVICIO)
      .toPromise();
    this.calcularTotalServicio();
  }

  abrirChat(isOpen: boolean){
    this.isModalOpen = isOpen; 
  }

  calcularTotalServicio() {
    this.total = 0;
    for (var k = 0; k < this.detalle_serv.length; k++) {
      this.total +=
        parseFloat(this.detalle_serv[k].PRECIO) *
        parseFloat(this.detalle_serv[k].CANTIDAD);
    }
  }

  onWillDismiss() {
    this.abrirChat(false);
  }
}
