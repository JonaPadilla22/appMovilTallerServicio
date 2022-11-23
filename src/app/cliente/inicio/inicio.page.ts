import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { LoadingController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.css'],
})
export class InicioPageCliente implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  id_usuario = JSON.parse(localStorage.getItem('USUARIO')).ID;
  public page: string = "Inicio";
  servicios: any = [];
  servicio: any;
  isModalOpen = false;

  async ngOnInit() {
    this.page = "Inicio";
    this.showLoading();
    await this.cargarServ();
    this.loadingCtrl.dismiss();
    if(this.servicios.length==0){
      (<HTMLInputElement>document.getElementById("noServices")).hidden = false;
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async cargarServ(){
    this.servicios = await this.servService.getServiciosCliente(this.id_usuario).toPromise();
    this.servicios = this.servicios.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS != "C" && serv.ESTATUS.ID_ESTATUS != "T"
      );
    });
  }

  constructor(
    private servService: ServicioService,
    private loadingCtrl: LoadingController
  ) {}

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.cargarServ();
      event.target.complete();
    }, 2000);
  };

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen; 
  }

  setServ(servicio: any){
    this.servicio = servicio;
  }
}
