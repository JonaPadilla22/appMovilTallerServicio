import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicios/servicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPageTecnico implements OnInit {
  public page: string;
  servicios: any = [];
  id_user = JSON.parse(localStorage.getItem('USUARIO')).ID;

  constructor(
    private loadingCtrl: LoadingController,
    private servService: ServicioService
  ) {}

  async ngOnInit() {
    this.page = 'Inicio tecnico';
    this.showLoading();

    await this.cargarServ();

    if(this.servicios.length==0){
      (<HTMLInputElement>document.getElementById("noServices")).hidden = false;
    }

    this.loadingCtrl.dismiss();  
  }

  async cargarServ(){
    this.servicios = await this.servService.getServiciosTecnico(this.id_user).toPromise();
    this.servicios = this.servicios.filter((serv: any) => {
      return (
        serv.ESTATUS.ID_ESTATUS != "C" && serv.ESTATUS.ID_ESTATUS != "T"
      );
    });
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      cssClass: 'custom-loading',
    });

    loading.present();
  }

  detalleServ(id: string){

  }
}
