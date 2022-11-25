import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.css'],
})
export class InicioPageTecnico implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  public page: string;
  servicios: any = [];
  id_user = JSON.parse(localStorage.getItem('USUARIO')).ID;
  tipo_usuario = JSON.parse(localStorage.getItem('USUARIO')).TIPO_USUARIO.ID;

  servicio: any;
  isModalOpen = false;
  loading = false;

  constructor(
    private loadingCtrl: LoadingController,
    private servService: ServicioService
  ) {}

  async ngOnInit() {
    this.page = this.tipo_usuario == 3 ? 'Inicio tecnico' : 'Inicio Administrador';

    this.showLoading();

    await this.cargarServ();
    if(this.loading){
      this.loadingCtrl.dismiss();
      this.loading=false;
    }  
    if (this.servicios.length == 0) {
      (<HTMLInputElement>document.getElementById('noServices')).hidden = false;
    }
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.cargarServ();
      event.target.complete();
    }, 2000);
  }

  async cargarServ() {
    this.loading = true;
    if(this.tipo_usuario == 3){
      this.servicios = await this.servService
        .getServiciosTecnico(this.id_user)
        .toPromise();
    }else{
      this.servicios = await this.servService
        .getServiciosPendientes()
        .toPromise();
    }

    this.servicios = this.servicios.filter((serv: any) => {
      return serv.ESTATUS.ID_ESTATUS != 'C' && serv.ESTATUS.ID_ESTATUS != 'T';
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  // detalleServ(id: string) {}

  async setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if(!isOpen){
      this.showLoading();
      await this.cargarServ();
      if(this.loading){
        this.loadingCtrl.dismiss();
        this.loading=false;
      }
    }
  }

  setServ(servicio: any) {
    this.servicio = servicio;
  }
}
