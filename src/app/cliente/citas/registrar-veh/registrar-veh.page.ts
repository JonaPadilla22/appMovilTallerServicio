import { CitaService } from 'src/app/services/citas/cita.service';
import { VehiculoService } from 'src/app/services/vehiculos/vehiculo.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-veh',
  templateUrl: './registrar-veh.page.html',
  styleUrls: ['./registrar-veh.page.css'],
})
export class RegistrarVehPage implements OnInit {
  @Input() id_cliente: any;
  @Output() matricula = new EventEmitter<string>();
  public formRegisterVeh: FormGroup;
  
  marcas: any;
  modelos: any;
  colores: string[] = ['NEGRO', 'ROJO', 'VERDE', 'BLANCO', 'AZUL'];
  date = new Date();
  defaultYear: any;
  maxYear: any;
  minYear: any = 1980;

  isModelEnabled: boolean = true;

  isSubmitted = false;

  constructor(
    private citaService: CitaService,
    private vehService: VehiculoService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) 
  {
    this.defaultYear = this.date.getFullYear();
    this.maxYear = this.defaultYear + 1;

    this.formRegisterVeh = this.formBuilder.group({
      MATRICULA: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      ID_MODELO: [{value: '', disabled: true}, [Validators.required]],
      ANIO: [this.defaultYear, [Validators.required, Validators.max(this.maxYear), Validators.min(this.minYear)]],
      COLOR:  ['', [Validators.required]],
      VIN: [null, [Validators.minLength(17), Validators.maxLength(17)]],
      ID_CLIENTE: ''
    });
  }

  async ngOnInit() {
    this.marcas = await this.citaService.getMarcas().toPromise();

  }

  async cambioMarca(id: any){
    this.modelos = await this.citaService.getModelos(id.detail.value).toPromise();
    this.formRegisterVeh.get('ID_MODELO')?.enable();
  }

  get errorControl() {
    return this.formRegisterVeh.controls;
  }

 async regVeh(){
  
    this.isSubmitted = true;
    if (!this.formRegisterVeh.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Llene correctamente todos los campos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return false;
    } else {
      this.formRegisterVeh.value.MATRICULA = this.formRegisterVeh.value.MATRICULA.toUpperCase();
      this.formRegisterVeh.value.ID_CLIENTE = this.id_cliente;
      console.log(this.formRegisterVeh.value);

      this.vehService.registrarVeh(this.formRegisterVeh.value).subscribe(
        {
          next: async (response: any) => {
            const alert = await this.alertController.create({
              header: 'Correcto',
              message: response.message,
              buttons: ['OK'],
            });
            await alert.present();
            this.matricula.emit(this.formRegisterVeh.value.MATRICULA);
            return this.modalCtrl.dismiss();
          },
          error: async (e) => {
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Ha ocurrido un error al registrar el vehículo',
              buttons: ['OK'],
            });
            console.log(e);
            await alert.present();
          }
        })
    }
  }

}
