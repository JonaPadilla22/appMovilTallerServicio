import { ChatClientePage } from './../cliente/chat-cliente/chat-cliente.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  type: string;

  appPages: any;
  labels: any;

  constructor(
    private alertController: AlertController, 
    private modalCtrl: ModalController,
    private router: Router,
    private firebaseService: FirebaseService
    ) {
  }

  ngOnInit() {
    let dataUser = JSON.parse(localStorage.getItem('USUARIO'));
    if (dataUser.TIPO_USUARIO.ID != 4) {
      this.type = 'employee';
    } else {
      this.type = 'client';
    }
    this.appPages = [
      {
        title: 'Inicio',
        url: `/${this.type}/inicio`,
        icon: 'home',
      },
      {
        title: 'Citas',
        url: `/${this.type}/citas`,
        icon: 'calendar-number',
      },
      {
        title: 'Historial',
        url: `/${this.type}/servicios`,
        icon: 'today',
      },
    ];
  }

  async closeSession(){
    const alert = await this.alertController.create({
      header: '¿Desea cerrar sesión?',
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
            await this.firebaseService.eliminarToken().toPromise();
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('USUARIO');
            localStorage.removeItem('TOKEN_NOTIF');
            
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  async changePass(){
    const modal = await this.modalCtrl.create({
      component: ChatClientePage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  changeImage(){
    console.log("cambiar imagen");
  }

}
