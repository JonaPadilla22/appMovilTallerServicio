import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Globals } from 'src/app/Global';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class FormLoginComponent implements OnInit {
  formLogin: any;

  constructor(
    private formBuilder: FormBuilder,
    public globals: Globals,
    private alertController: AlertController,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      CORREO: '',
      CONTRA: '',
    });
  }

  ngOnInit(): void {
    // TODO: check wat user is loged to redirect to his page
    // if (localStorage.getItem('TOKEN')) this.router.navigate(['/cita']);
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
      next: async (v: any) => {
        const alert = await this.alertController.create({
          header: 'Bienvenido',
          buttons: ['OK'],
        });

        await alert.present();
        localStorage.setItem('TOKEN', v.TOKEN);
        this.globals.usuario = v.USUARIO.ID;
        this.router.navigate(['/employee'], { skipLocationChange: true });
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
