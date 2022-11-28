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
  estatus: any;

  id_user = JSON.parse(localStorage.getItem('USUARIO')).ID;
  tipo_usuario = JSON.parse(localStorage.getItem('USUARIO')).TIPO_USUARIO.ID;

  servicio: any;
  isModalOpen = false;
  loading = false;

  async ngOnInit() {
    this.page = "Citas";
    this.showLoading();

    await this.cargarServ();
    if(this.loading){
      this.loadingCtrl.dismiss();
      this.loading=false;
    } 
    if(this.servicios.length==0){
      (<HTMLInputElement>document.getElementById("noServices")).hidden = false;
    }
  }

  async cargarServ(){
    this.loading = true;
    if(this.tipo_usuario == 3){
      console.log(this.id_user);

      this.servicios = await this.servService
        .getServiciosTecnico(this.id_user)
        .toPromise();

      this.servicios = this.servicios.filter((serv: any) => {
        return (
          serv.ESTATUS.ID_ESTATUS == "C" && serv.TECNICO_ENCARGADO
        );
      });

    }else{
      this.servicios = await this.citaService
        .getCitasPendientes()
        .toPromise();
      this.servicios.forEach((element: any) => {
        element.ESTATUS = {ID_ESTATUS: element.ID_ESTATUS, DESCRIPCION: "CITA"}
        delete element.ID_ESTATUS
      });
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

  getSigEstatus(id_est: string): any{
    const resultado = this.estatus.find( (est: any) => est.ID_ESTATUS === id_est);
    let sig_id = this.estatus.indexOf(resultado) + 1;

    return this.estatus[sig_id];
  }


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
