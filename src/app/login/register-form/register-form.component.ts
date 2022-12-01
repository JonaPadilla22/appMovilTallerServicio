import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
// import { Globals } from 'src/app/Global';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { regexComp } from 'src/app/utils/regexCompForms';

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
    // public globals: Globals,
    private alertController: AlertController,
    private clientService: ClienteService
  ) {
    this.formRegister = this.formBuilder.group({
      TIPO_PERSONA: 1,
      TIPO_USUARIO: 4,
      NOMBRE: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      AP1: this.formBuilder.control('', Validators.maxLength(15)),
      AP2: this.formBuilder.control('', Validators.maxLength(15)),
      TELEFONO: this.formBuilder.control('', [
        Validators.required,
        regexComp(/^\d{10}$/)
      ]),
      CORREO: this.formBuilder.control('', Validators.required),
      RFC: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(this.isMoralPerson ? 13 : 12),
        Validators.maxLength(this.isMoralPerson ? 13 : 12),
      ]),
      DIRECCION: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(40),
      ]),
    });
  }

  get name() {
    return this.formRegister.get('NOMBRE');
  }
  get ap1() {
    return this.formRegister.get('AP1');
  }
  get ap2() {
    return this.formRegister.get('AP2');
  }
  get tel() {
    return this.formRegister.get('TELEFONO');
  }
  get correo() {
    return this.formRegister.get('CORREO');
  }
  get rfc() {
    return this.formRegister.get('RFC');
  }
  get direc() {
    return this.formRegister.get('DIRECCION');
  }

  ngOnInit(): void {
    // TODO: check wat user is loged to redirect to his page
    // if (localStorage.getItem('TOKEN')) this.router.navigate(['/cita']);
  }
  createForm() {
    this.formRegister.reset();
    this.formRegister = this.formBuilder.group({
      TIPO_PERSONA: 1,
      TIPO_USUARIO: 4,
      NOMBRE: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      AP1: this.formBuilder.control('', Validators.maxLength(15)),
      AP2: this.formBuilder.control('', Validators.maxLength(15)),
      TELEFONO: this.formBuilder.control('', [
        Validators.required,
        regexComp(/^\d{10}$/)
      ]),
      CORREO: this.formBuilder.control('', Validators.required),
      RFC: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(this.isMoralPerson ? 13 : 12),
        Validators.maxLength(this.isMoralPerson ? 13 : 12),
      ]),
      DIRECCION: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(40),
      ]),
    });
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

    if (!this.formRegister.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Llene correctamente todos los campos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return
    }

    let registerUsr: any = {
      ID_TIPO_PERSONA: 1,
      ID_TIPO_USUARIO: 4,
      NOMBRE: name + ln1 + ln2,
      TELEFONO: telefono,
      CORREO: correo,
      RFC: rfc,
      DIRECCION: address,
    };

    if (this.isMoralPerson) {
      registerUsr.ID_TIPO_PERSONA = 2;
    }

    this.clientService.registrarUsuario(registerUsr).subscribe({
      next: async (v: any) => {
        const alert = await this.alertController.create({
          header: 'Registrado con Éxito, por favor revise su bandeja de correo para consultar la contraseña',
          buttons: ['OK'],
        });

        await alert.present();
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

  }
}
