import { AlertController } from '@ionic/angular';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  id_user:any;

  @ViewChild('inputActualPass') inputActualPass: any;
  @ViewChild('inputNewPass') inputNewPass: any;
  @ViewChild('inputConfPass') inputConfPass: any;

  constructor(
    private clientService: ClienteService,
    private alertController: AlertController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.id_user = JSON.parse(await this.storage.get('USUARIO')).ID;
  }

  async changePass(){

    let actualPass: string = this.inputActualPass.value;
    let newPass: string = this.inputNewPass.value;
    let confPass: string = this.inputConfPass.value;


    const alert = await this.alertController.create({
      header: '¿Desea cambiar la contraseña?',
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
            if(newPass!=confPass){
              const alert = await this.alertController.create({
                header: 'Error',
                message: "LA CONFIRMACIÓN NO COINCIDE CON LA NUEVA CONTRASEÑA",
                buttons: ['OK'],
              });
              await alert.present();
            }else{
              this.clientService.updatePassword(this.id_user, actualPass, newPass).subscribe(
                {
                  next: async (response: any) => {
                    const alert = await this.alertController.create({
                      header: 'Éxito',
                      message: response.message,
                      buttons: ['OK'],
                    });
                    await alert.present();
                    this.inputActualPass.value = "";
                    this.inputNewPass.value = "";
                    this.inputConfPass.value = "";
                  },
                  error: async (e) => {
                    console.log(e);
                    const alert = await this.alertController.create({
                      header: 'Error',
                      message: "LA CONTRASEÑA ACTUAL NO ES CORRECTA",
                      buttons: ['OK'],
                    });
                    await alert.present();
                  }
                }
              );
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
