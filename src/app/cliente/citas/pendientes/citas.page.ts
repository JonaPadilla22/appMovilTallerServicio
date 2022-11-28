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
  id_usuario = JSON.parse(localStorage.getItem('USUARIO')).ID;
  public page: string;
  citas: any = [];
  num_citas: number = 0;
  cita: number = 0;
  citasToShow: any = [];
  id_cita: string = ""

  isModalOpen = false;
  loading = false;


  async ngOnInit() {
    this.page = "Citas";
    // this.showLoading();
    await this.cargarCitas();
    // if(this.loading){
    //   this.loadingCtrl.dismiss();
    //   this.loading=false;
    // }  
    this.num_citas = this.citas.length;
    if(this.num_citas==0){
      (<HTMLInputElement>document.getElementById('noServices')).hidden = false;
    }
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
  ) {}

  handleSearchChange(event: any) {
    this.citasToShow = this.filtrarServicios(event.target.value);
  }

  filtrarServicios(text: string) {
    return this.citas.filter((serv: any) => {
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

  async cargarCitas(){
    this.loading = true;
    this.citas = await this.servService.getServiciosCliente(this.id_usuario).toPromise();
    this.citas = this.citas.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS == "C"
      );
    });

    this.citasToShow = this.citas;
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
      // this.showLoading();
      await this.cargarCitas();
      // if(this.loading){
      //   this.loadingCtrl.dismiss();
      //   this.loading=false;
      // }
    }
  }

  setServ(cita: any){
    this.id_cita = "'" + cita.ID_SERVICIO + "'";
    this.cita = cita;
  }
}
