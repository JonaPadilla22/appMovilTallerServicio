import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { AlertController } from '@ionic/angular';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';

@Component({
  selector: 'app-detalle-serv-empleado',
  templateUrl: './detalle-serv-empleado.page.html',
  styleUrls: ['./detalle-serv-empleado.page.css'],
})
export class DetalleServEmpleadoPage implements OnInit {
  @Input() serv: any; 
  url = environment.baseUrlAPI + "/usuarios/";
  isModalOpen = false;
  user = JSON.parse(localStorage.getItem('USUARIO'));
  estatus: any;

  constructor(
    private servService: ServicioService,
    private alertController: AlertController,
    private notifService: NotificacionService
  ) { }

  async ngOnInit() {
    this.estatus = await this.servService.getEstatus().toPromise();

   
  }

  getSigEstatus(id_est: string): any{
    const resultado = this.estatus.find( (est: any) => est.ID_ESTATUS === id_est);
    let sig_id = this.estatus.indexOf(resultado) + 1;

    return this.estatus[sig_id];
  }

  async updateStatus(){
    let sig_estatus: any;
    if(this.serv.ESTATUS.ID_ESTATUS!='C'){
      sig_estatus = this.getSigEstatus(this.serv.ESTATUS.ID_ESTATUS);
    }else{
      
      sig_estatus = {ID_ESTATUS: "I", DESCRIPCION: "INGRESADO"};
    }
    // console.log(sig_estatus)

    const alert = await this.alertController.create({
      header: `¿Desea actualizar el estatus del servicio a "${sig_estatus.DESCRIPCION}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: async () => {
            const formActServ = new FormData();
            formActServ.append("ID_SERVICIO", this.serv.ID_SERVICIO);
            formActServ.append("ID_ESTATUS", sig_estatus.ID_ESTATUS);
            formActServ.append("ID_USUARIO", this.user.ID);

            this.servService.actualizarEstatus(formActServ).subscribe(
              {
                next: async (response: any) => {
                  
                  var nom_cliente = this.serv.CLIENTE.NOMBRE;
                  var veh = this.serv.VEHICULO.MODELO.MARCA.DESCRIPCION + " " + this.serv.VEHICULO.MODELO.DESCRIPCION;
                  var mat = this.serv.VEHICULO.MATRICULA;
                  var title = "ACTUALIZACIÓN DE SERVICIO";

                  var body = "HOLA " + nom_cliente + ", SU VEHÍCULO "+ veh + " CON MATRÍCULA: " + mat;
                  if(sig_estatus.ID_ESTATUS=="I"){
                    body += " ACABA DE INGRESAR A TALLER";
                  }else if(sig_estatus.ID_ESTATUS=="R"){
                    body += " ACABA DE ENTRAR EN REVISIÓN";
                  }
                  else if(sig_estatus.ID_ESTATUS=="S"){
                    body += " ACABA DE ENTRAR EN SALIDA DE TALLER";
                  }
                  else if(sig_estatus.ID_ESTATUS=="T"){
                    body += " ACABA DE SALIR DE TALLER";
                  }
                                
                  this.notifService.sendNotificationUser(this.serv.CLIENTE.ID, title, body).subscribe();

                  const alert = await this.alertController.create({
                    header: 'Éxito',
                    message: response.message,
                    buttons: ['OK'],
                  });
                  await alert.present();
                  this.serv = await this.servService.getServicioById(this.serv.ID_SERVICIO).toPromise();
                  this.serv = this.serv[0];
                },
                error: (e) => console.log(e)
              })
          },
        },
      ],
    });
    await alert.present();
  }

  abrirChat(isOpen: boolean){
    this.isModalOpen = isOpen; 
  }

}
