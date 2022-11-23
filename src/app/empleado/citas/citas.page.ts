import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicios/servicio.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.css'],
})
export class CitasPage implements OnInit {
  public page: string;
  servicios: any = [];
  id_user = JSON.parse(localStorage.getItem('USUARIO')).ID;

  async ngOnInit() {
    this.page = "Citas";
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
        serv.ESTATUS.ID_ESTATUS == "C"
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

  constructor(
    private loadingCtrl: LoadingController,
    private servService: ServicioService
  ) {}

  detalleServ(id: string){
    alert(id);
  }
}
