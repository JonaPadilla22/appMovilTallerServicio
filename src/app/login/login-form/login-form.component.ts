import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class FormLoginComponent implements OnInit {
  formLogin: any;
  public token: string;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loginService: LoginService,
    private router: Router,
    private firebaseService: FirebaseService
  )
  {
    this.formLogin = this.formBuilder.group({
      CORREO: '',
      CONTRA: '',
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('TOKEN')){
      if(JSON.parse(localStorage.getItem('USUARIO')).TIPO_USUARIO.ID==4){
        this.router.navigate(['/client']);
      }else{
        this.router.navigate(['/employee']);
      }
    } 
  }

  public async validateLogin() {
    let correo = this.formLogin.value.CORREO;
    let contra = this.formLogin.value.CONTRA;

    if (correo == '' || contra == '') {
      const alert = await this.alertController.create({
        header: 'Error de Formulario',
        message: 'Porfavor asegurese de introducir todos los campos requeridos',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    this.loginService.validateLogin(this.formLogin.value).subscribe({
      next: async (dataUser: any) => {
        const alert = await this.alertController.create({
          header: 'Bienvenido',
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                this.router.navigate(['/client']);
              },
            }
          ],
        });
   
        localStorage.setItem('TOKEN', dataUser.TOKEN);
        localStorage.setItem('USUARIO', JSON.stringify(dataUser.USUARIO));

        if(dataUser.USUARIO.TIPO_USUARIO.ID == 4){
          PushNotifications.requestPermissions().then((result) => {
            if (result.receive === 'granted') {
              PushNotifications.register();
            } else {
            }
          });

          PushNotifications.addListener('registration', (token: Token) => {
            this.token = token.value;
            localStorage.setItem('TOKEN_NOTIF', this.token);
            this.firebaseService.enviarToken(token, JSON.parse(localStorage.getItem('USUARIO')).ID).subscribe();
          });

          await alert.present();  
          return
        }

        this.router.navigate(['/employee']);
      },
      error: async (e) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: e.error,
          buttons: ['OK'],
        });

        await alert.present();
      },
    });
  }
}
