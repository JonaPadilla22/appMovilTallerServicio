import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  type: string;
  dataUser: any;

  appPages: any;
  labels: any;
  isEmployee: boolean = false;

  modalPasswordOpen = false;
  modalImageOpen = false;
  modalScanQR = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firebaseService: FirebaseService, 
    private storage: Storage
  ) 
  { }

  async ngOnInit() {
    this.dataUser = JSON.parse(await this.storage.get('USUARIO'));
    if(this.dataUser.TIPO_USUARIO.ID!=4){
      this.isEmployee = true;
    }
    if (this.dataUser.TIPO_USUARIO.ID != 4) {
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
    console.log("ja")
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
            await this.firebaseService.eliminarToken(await this.storage.get('TOKEN_NOTIF')).toPromise();
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
    this.modalPasswordOpen = true;
  }

  changeImage(){
    this.modalImageOpen = true;
  }

  scanQR(){
    this.modalScanQR = true;
  }
}
