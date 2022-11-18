import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicios/servicio.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.css'],
})
export class CitasPageCliente implements OnInit {
  public page: string;
  servicios: any = [];

  async ngOnInit() {
    this.page = "Citas";
    this.showLoading();
    this.servicios = await this.servService.getServiciosTecnico("2").toPromise();
    this.servicios = this.servicios.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS != "C" && serv.ESTATUS.ID_ESTATUS != "T"
      );
    });
    this.loadingCtrl.dismiss();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  constructor(
    private servService: ServicioService,
    private loadingCtrl: LoadingController
  ) {}

  detalleServ(id: string){
    alert(id);
  }
}
