import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicios/servicio.service';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.css'],
})
export class CitasPageCliente implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  id_usuario:any;
  public page: string;
  citas: any = [];
  num_citas: number = 0;
  cita: number = 0;
  id_cita: string = ""

  isModalOpen = false;
  loading = false;


  async ngOnInit() {
    this.page = "Citas";
    this.showLoading();
    await this.cargarCitas();
    if(this.loading){
      this.loadingCtrl.dismiss();
      this.loading=false;
    }  
    this.num_citas = this.citas.length;
    this.id_usuario = JSON.parse(await this.storage.get('USUARIO')).ID;
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
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
  }

  async cargarCitas(){
    this.loading = true;
    this.citas = await this.servService.getServiciosCliente(this.id_usuario).toPromise();
    this.citas = this.citas.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS == "C"
      );
    });
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.cargarCitas();
      event.target.complete();
    }, 2000);
  };

  async setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if(!isOpen){
      this.showLoading();
      await this.cargarCitas();
      if(this.loading){
        this.loadingCtrl.dismiss();
        this.loading=false;
      }
    }
  }

  setServ(cita: any){
    this.id_cita = "'" + cita.ID_SERVICIO + "'";
    this.cita = cita;
  }
}
