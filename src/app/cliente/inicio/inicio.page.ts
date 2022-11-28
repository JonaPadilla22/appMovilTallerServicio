import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { LoadingController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
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
  serviciosToShow: any = [];
  servicio: any;
  isModalOpen = false;
  loading = false;

  async ngOnInit() {
    this.page = "Inicio";
    // this.showLoading();
    await this.cargarServ();
    // if(this.loading){
    //   this.loadingCtrl.dismiss();
    //   this.loading=false;
    // }   
    if(this.servicios.length==0){
      (<HTMLInputElement>document.getElementById("noServices")).hidden = false;
    }

    
    // Method called when tapping on a notification
    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   (notification: ActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );

  }

  async showLoading() {
    this.loading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  handleSearchChange(event: any) {
    this.serviciosToShow = this.filtrarServicios(event.target.value);
  }

  filtrarServicios(text: string) {
    return this.servicios.filter((serv: any) => {
      const term = text.toLowerCase();
      let carro =
        serv.VEHICULO.MODELO.MARCA.DESCRIPCION +
        ' ' +
        serv.VEHICULO.MODELO.DESCRIPCION +
        ' ' +
        serv.VEHICULO.COLOR +
        ' ' +
        serv.VEHICULO.ANIO;
      return (
        carro.toLowerCase().includes(term) ||
        serv.VEHICULO.MATRICULA.toLowerCase().includes(term) ||
        serv.TECNICO_ENCARGADO?.NOMBRE.toLowerCase().includes(term) ||
        serv.ESTATUS.DESCRIPCION.toLowerCase().includes(term)
      );
    });
  }

  async cargarServ(){
    this.loading = true;
    this.servicios = await this.servService.getServiciosCliente(this.id_usuario).toPromise();
    this.servicios = this.servicios.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS != "C" && serv.ESTATUS.ID_ESTATUS != "T"
      );
    });

    this.serviciosToShow = this.servicios;
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

  async setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if(!isOpen){
      // this.showLoading();
      await this.cargarServ();
      // if(this.loading){
      //   this.loadingCtrl.dismiss();
      //   this.loading=false;
      // }
    }
  }

  setServ(servicio: any){
    this.servicio = servicio;
  }

  onWillDismiss() {
    this.isModalOpen = false;
  }

  
}
