
import { Component, OnInit, ViewChild } from '@angular/core';
import { CitaService } from 'src/app/services/citas/cita.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { VehiculoService } from 'src/app/services/vehiculos/vehiculo.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController, IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-registrar-cita',
  templateUrl: './registrar-cita.page.html',
  styleUrls: ['./registrar-cita.page.css'],
})
export class RegistrarCitaPage implements OnInit {
  page = "Registrar"
  public formRegisterCit: FormGroup;
  id_cliente = JSON.parse(localStorage.getItem('USUARIO')).ID;

  typesServ: any;
  vehiculos: any;
  veh_selec: any;
  matricula_selec: string;
  cita: any;
  id_cita: any;

  date = new Date();
  fecha: any;
  max: any;
  time: any;

  @ViewChild('vehSelect', { static: false }) vehSelect: IonSelect;
  isSubmitted = false;

  constructor(
    private servService: CitaService,
    private servicioService: ServicioService,
    private vehService: VehiculoService,
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) { 
    this.formRegisterCit = this.formBuilder.group({
      ID_TIPO_SERVICIO: ['', [Validators.required]],
      DESCRIPCION: ['', [Validators.required]],
      MATRICULA:  ['', [Validators.required]],
      FECHA_CITA: ['', [Validators.required]],
      CLIENTE: ''
    });
  }

  isModalOpen = false;
  isModalRegVehOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpenRegVeh(isOpen: boolean) {
    this.isModalRegVehOpen = isOpen;
  }

  async ngOnInit() {

    let dia: string;
    let mes: string;
    let anio: string;
    if(this.date.getDate()<10){
      dia = "0" + (this.date.getDate())
    }else{
      dia = this.date.getDate().toString()
    }
    
    if(this.date.getUTCMonth()+2>12){
      mes = "01"
      anio = (this.date.getUTCFullYear()+1).toString()
    }else{
      mes = (this.date.getUTCMonth()+1).toString()
      anio = (this.date.getUTCFullYear()).toString()
    }

    this.fecha = this.date.getUTCFullYear() + "-" + (this.date.getUTCMonth()+1) + "-" + dia + "T00:00:00";
    this.max = anio + "-" + mes + "-" + dia + "T21:59:59";
    this.time = { hour: this.date.getHours, minute: 0};
    this.typesServ = await this.servService.getTiposServicios().toPromise();
    this.cargarVeh();
  }

  get errorControl() {
    return this.formRegisterCit.controls;
  }

  cambioVeh(matricula: any){
    this.actualizarVeh(matricula.detail.value);
  }

  async cargarVeh(){
    this.vehiculos = await this.vehService.getVehiculosByCliente(this.id_cliente).toPromise();
  }

  async actualizarVeh(matricula: string){  
    await this.cargarVeh();
    this.veh_selec = this.vehiculos.find((veh: any) => veh.MATRICULA == matricula);
    this.vehSelect.value = matricula;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Desea confirmar el registro?',
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
          handler: () => {
            //this.setOpen(true);
            this.regCit();
          },
        },
      ],
    });
    await alert.present();
  }

  async regCit(){
  
    this.isSubmitted = true;
    this.formRegisterCit.value.CLIENTE = parseInt(this.id_cliente);
    if (!this.formRegisterCit.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Llene correctamente todos los campos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return false;
    } else {
      this.servService.registrarCita(this.formRegisterCit.value).subscribe(
        {
          next: async (response: any) => {
            const alert = await this.alertController.create({
              header: 'Correcto',
              message: response.message,
              buttons: ['OK'],
            });
            const formAct = new FormData();
            this.cita = await this.servicioService.getServicioById(response.data.ID_SERVICIO).toPromise();
            formAct.append("ID_SERVICIO", response.data.ID_SERVICIO);
            formAct.append("ID_ESTATUS", "C");
            formAct.append("ID_USUARIO", this.id_cliente);
            this.servService.registrarActualizacioServ(formAct).subscribe();

            await alert.present();
            await alert.dismiss();    
           
            this.cita = this.cita[0];
            this.id_cita = "'" + this.cita.ID_SERVICIO + "'";
            
            this.setOpen(true);
            //this.matricula.emit(this.formRegisterCit.value.MATRICULA);
          },
          error: async (e) => {
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Ha ocurrido un error al registrar la cita de servicio',
              buttons: ['OK'],
            });
            console.log(e);
            await alert.present();
          }
        })
    }
  }

  limpiarVeh(){
    this.veh_selec = undefined;
    this.vehSelect.value = '';
  }

}
