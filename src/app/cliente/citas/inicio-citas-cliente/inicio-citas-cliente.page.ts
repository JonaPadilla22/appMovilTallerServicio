
import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
@Component({
  selector: 'app-inicio-citas-cliente',
  templateUrl: './inicio-citas-cliente.page.html',
  styleUrls: ['./inicio-citas-cliente.page.css'],
})
export class InicioCitasClientePage implements OnInit {
  citas: any = [];
  num_citas: number = 0;
  public page: string = "Citas";

  constructor(private servService: ServicioService) { }

  async ngOnInit() {
    this.citas = await this.servService.getServiciosCliente("3").toPromise();
    this.citas = this.citas.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS == "C"
      );
    });
    this.num_citas = this.citas.length;
  }

}
