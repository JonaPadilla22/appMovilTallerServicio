import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { CitaService } from 'src/app/services/citas/cita.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.css'],
})
export class CitasPage implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  public page: string;
  servicios: any = [];
  id_user = JSON.parse(localStorage.getItem('USUARIO')).ID;
  tipo_usuario = JSON.parse(localStorage.getItem('USUARIO')).TIPO_USUARIO.ID;

  servicio: any;
  isModalOpen = false;

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
    if(this.tipo_usuario == 3){
      this.servicios = await this.servService
        .getServiciosTecnico(this.id_user)
        .toPromise();

      this.servicios = this.servicios.filter((serv: any) => {
        return (
          serv.ESTATUS.ID_ESTATUS == "C"
        );
      });
    }else{
      this.servicios = await this.citaService
        .getCitasPendientes()
        .toPromise();
      console.log(this.servicios)
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
    private loadingCtrl: LoadingController,
    private servService: ServicioService,
    private citaService: CitaService
  ) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setServ(servicio: any) {
    this.servicio = servicio;
  }
}
