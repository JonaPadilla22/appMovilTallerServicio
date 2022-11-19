import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Globals } from 'src/app/Global';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  isMoralPerson: boolean = false;

  formRegister: any;

  constructor(
    private formBuilder: FormBuilder,
    public globals: Globals,
    private alertController: AlertController,
    private clientService: ClienteService,
  ) {
    this.formRegister = this.formBuilder.group({
      TIPO_PERSONA: 1,
      TIPO_USUARIO: 4,
      NOMBRE: '',
      AP1: '',
      AP2: '',
      TELEFONO: '',
      CORREO: '',
      RFC: '',
      DIRECCION: '',
    });
  }

  ngOnInit(): void {
    // TODO: check wat user is loged to redirect to his page
    // if (localStorage.getItem('TOKEN')) this.router.navigate(['/cita']);
  }

  public async validateRegister() {
    let correo = this.formRegister.value.CORREO;
    let name = this.formRegister.value.NOMBRE;
    let ln1 = this.formRegister.value.AP1;
    let ln2 = this.formRegister.value.AP2;
    let telefono = this.formRegister.value.TELEFONO;
    let rfc = this.formRegister.value.TELEFONO;
    let address = this.formRegister.value.TELEFONO;

    // TODO: do validations
    
    let registerUsr: any = {
      ID_TIPO_PERSONA: 1,
      ID_TIPO_USUARIO: 4,
      NOMBRE: name + ln1 + ln2,
      TELEFONO: telefono,
      CORREO: correo,
      RFC: rfc,
      DIRECCION: address,
    };

    if (correo == '' || name == '') {
      const alert = await this.alertController.create({
        header: 'Error de Formulario',
        message: 'Porfavor asegurese de introducir todos los campos requeridos',
        buttons: ['OK'],
      });

      await alert.present();
      return 0;
    }

    if (this.isMoralPerson) {
      registerUsr.ID_TIPO_PERSONA = 2;
    }

    this.clientService.registrarUsuario(registerUsr).subscribe({
      next: async (v: any) => {
        const alert = await this.alertController.create({
          header: 'Registrado con Éxito',
          buttons: ['OK'],
        });

        await alert.present();
        return 1;
      },
      error: async (e) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: JSON.stringify(e.error),
          buttons: ['OK'],
        });

        await alert.present();
      },
    });

    return 1;
  }
}
