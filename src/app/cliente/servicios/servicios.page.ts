import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.css'],
})
export class ServiciosPageCliente implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  id_usuario = JSON.parse(localStorage.getItem('USUARIO')).ID;
  public page: string = "Historial";
  servicios: any = [];
  servicio: any;
  isModalOpen = false;
  loading = false;
  serviciosToShow: any = [];

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  async cargarServ(){
    this.loading = true;
    this.servicios = await this.servService.getServiciosCliente(this.id_usuario).toPromise();
    this.servicios = this.servicios.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS == "T"
      );
    });
    this.serviciosToShow = this.servicios;

  }

  constructor(
    private servService: ServicioService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    this.page = "Historial";
    // this.showLoading();
    await this.cargarServ();
    // if(this.loading){
    //   this.loadingCtrl.dismiss();
    //   this.loading=false;
    // }  
    if(this.servicios.length==0){
      (<HTMLInputElement>document.getElementById("noServices")).hidden = false;
    }
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.cargarServ();
      event.target.complete();
    }, 2000);
  };

  
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
