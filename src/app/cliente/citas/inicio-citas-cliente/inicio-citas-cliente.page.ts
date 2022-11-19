import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicios/servicio.service';

@Component({
  selector: 'app-inicio-citas-cliente',
  templateUrl: './inicio-citas-cliente.page.html',
  styleUrls: ['./inicio-citas-cliente.page.css'],
})
export class InicioCitasClientePage implements OnInit {
  public page: string;
  citas: any = [];
  num_citas: number = 0;

  constructor(private servService: ServicioService) { }

  async ngOnInit() {
    this.page = "Citas";
    this.citas = await this.servService.getServiciosTecnico("2").toPromise();
    this.citas = this.citas.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS != "C" && serv.ESTATUS.ID_ESTATUS != "T"
      );
    });
    this.num_citas = this.citas.length;
  }

}
