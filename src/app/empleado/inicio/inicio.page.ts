import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
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
  id_user:any;
  tipo_usuario:any;

  servicio: any;
  isModalOpen = false;
  loading = false;

  constructor(
    private loadingCtrl: LoadingController,
    private servService: ServicioService,
    private storage: Storage
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
    this.id_user = JSON.parse(await this.storage.get('USUARIO')).ID;
    this.tipo_usuario = JSON.parse(await this.storage.get('USUARIO')).TIPO_USUARIO.ID;
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
        this.servicios.forEach(async (element: any) => {
          element.TECNICO_ENCARGADO = JSON.parse(await this.storage.get('USUARIO'))
        });
    }else{
      this.servicios = await this.servService
        .getServiciosPendientes()
        .toPromise();
    }

    this.servicios = this.servicios.filter((serv: any) => {
      return serv.ESTATUS.ID_ESTATUS != 'C' && serv.ESTATUS.ID_ESTATUS != 'T';
    });

    if (this.servicios.length != 0) {
      (<HTMLInputElement>document.getElementById('noServices')).hidden = true;
    }
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
