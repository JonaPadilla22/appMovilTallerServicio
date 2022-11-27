import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { AlertController, IonInput } from '@ionic/angular';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';
import { RefaccionService } from 'src/app/services/refacciones/refaccion.service';

@Component({
  selector: 'app-detalle-serv-empleado',
  templateUrl: './detalle-serv-empleado.page.html',
  styleUrls: ['./detalle-serv-empleado.page.css'],
})
export class DetalleServEmpleadoPage implements OnInit {
  @Input() serv: any;
  url = environment.baseUrlAPI + '/usuarios/';
  isModalOpen = false;
  user = JSON.parse(localStorage.getItem('USUARIO'));
  estatus: any;
  actualizaciones_serv: any;
  detalle_serv: any;
  refacciones: any;
  mano_obra: any;

  productos: any;
  productosToShow: any;

  prod_selec: any = [];

  total: any;
  total_selec: any = 0;
  @ViewChild('inputCantidad', { static: false }) inputCantidad: IonInput;

  constructor(
    private servService: ServicioService,
    private alertController: AlertController,
    private notifService: NotificacionService,
    private refService: RefaccionService
  ) {}

  async ngOnInit() {
    this.estatus = await this.servService.getEstatus().toPromise();
    this.actualizaciones_serv = await this.servService
      .getActualizacionesServicios(this.serv.ID_SERVICIO)
      .toPromise();
    this.detalle_serv = await this.servService
      .getDetalleServicio(this.serv.ID_SERVICIO)
      .toPromise();
    this.refacciones = await this.refService.getRefactions().toPromise();
    this.mano_obra = await this.refService.getWorkforce().toPromise();

    this.productos = this.refacciones.concat(this.mano_obra);

    this.productosToShow = this.productos

    this.calcularTotalServicio();
  }

  getSigEstatus(id_est: string): any {
    const resultado = this.estatus.find(
      (est: any) => est.ID_ESTATUS === id_est
    );
    let sig_id = this.estatus.indexOf(resultado) + 1;
    return this.estatus[sig_id];
  }

  async updateStatus() {
    let sig_estatus: any;
    if (this.serv.ESTATUS.ID_ESTATUS != 'C') {
      sig_estatus = this.getSigEstatus(this.serv.ESTATUS.ID_ESTATUS);
    } else {
      sig_estatus = { ID_ESTATUS: 'I', DESCRIPCION: 'INGRESADO' };
    }

    const alert = await this.alertController.create({
      header: `¿Desea actualizar el estatus del servicio a "${sig_estatus.DESCRIPCION}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: async () => {
            const formActServ = new FormData();
            formActServ.append('ID_SERVICIO', this.serv.ID_SERVICIO);
            formActServ.append('ID_ESTATUS', sig_estatus.ID_ESTATUS);
            formActServ.append('ID_USUARIO', this.user.ID);

            this.servService.actualizarEstatus(formActServ).subscribe({
              next: async (response: any) => {
                var nom_cliente = this.serv.CLIENTE.NOMBRE;
                var veh =
                  this.serv.VEHICULO.MODELO.MARCA.DESCRIPCION +
                  ' ' +
                  this.serv.VEHICULO.MODELO.DESCRIPCION;
                var mat = this.serv.VEHICULO.MATRICULA;
                var title = 'ACTUALIZACIÓN DE SERVICIO';

                var body =
                  'HOLA ' +
                  nom_cliente +
                  ', SU VEHÍCULO ' +
                  veh +
                  ' CON MATRÍCULA: ' +
                  mat;
                if (sig_estatus.ID_ESTATUS == 'I') {
                  body += ' ACABA DE INGRESAR A TALLER';
                } else if (sig_estatus.ID_ESTATUS == 'R') {
                  body += ' ACABA DE ENTRAR EN REVISIÓN';
                } else if (sig_estatus.ID_ESTATUS == 'S') {
                  body += ' ACABA DE ENTRAR EN SALIDA DE TALLER';
                } else if (sig_estatus.ID_ESTATUS == 'T') {
                  body += ' ACABA DE SALIR DE TALLER';
                }

                this.notifService
                  .sendNotificationUser(this.serv.CLIENTE.ID, title, body)
                  .subscribe();

                const alert = await this.alertController.create({
                  header: 'Éxito',
                  message: response.message,
                  buttons: ['OK'],
                });
                await alert.present();
                this.serv = await this.servService
                  .getServicioById(this.serv.ID_SERVICIO)
                  .toPromise();
                this.serv = this.serv[0];
              },
              error: (e) => console.log(e),
            });
          },
        },
      ],
    });
    await alert.present();
  }

  abrirChat(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  calcularTotalServicio() {
    this.total = 0;
    for (var k = 0; k < this.detalle_serv.length; k++) {
      this.total +=
        parseFloat(this.detalle_serv[k].PRECIO) *
        parseFloat(this.detalle_serv[k].CANTIDAD);
    }
  }

  async selectProd(e: any) {
    // console.log(e);
    let prodExists: boolean = false;
    if(e.STOCK < 1){
      const alert = await this.alertController.create({
        header: 'Warning',
        message: 'El producto seleccionado no tiene stock',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    this.prod_selec.map(async (prod: any) => {
      if (e.DESCRIPCION == prod.DESCRIPCION) {
        prodExists = true;
      }
    });

    if (prodExists) {
      const alert = await this.alertController.create({
        header: 'Warning',
        message: 'El producto seleccionado ya esta agregado',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.prod_selec.push(e);
    this.total_selec += e.PRECIO;
  }

  actTotalSelec(ev:any,prod_selected: any) {
    

    if(prod_selected.CANTIDAD){
      this.total_selec -= prod_selected.PRECIO * prod_selected.CANTIDAD;
    }else{
      this.total_selec -= prod_selected.PRECIO;
    }
    
    this.total_selec += prod_selected.PRECIO * ev.target.value;

    this.prod_selec = this.prod_selec.map((prod: any) => {
      if (prod_selected.DESCRIPCION == prod.DESCRIPCION) {
        prod.CANTIDAD = ev.target.value;
      }
      return prod
    });

  }

  async aggProd() {
    const alert = await this.alertController.create({
      header: '¿Esta seguro desea agregar estos productos al servicio?',
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
            this.prod_selec.forEach((prod: any, index: any) => {
              let id_prod: number = prod.ID ?? prod.ID_MANO_OBRA;
              let tipo_prod: string = prod.ID ? 'R' : 'M';
      
              const formAct = new FormData();
              formAct.append('ID_SERVICIO', this.serv.ID_SERVICIO);
              formAct.append('ID_PRODUCTO', id_prod.toString());
              formAct.append('TIPO_PROD', tipo_prod);
              formAct.append('PRECIO', prod.PRECIO);
              formAct.append('CANTIDAD', prod.CANTIDAD ?? 1);
      
              this.servService.insertarDetalleServ(formAct).subscribe({
                next: async (response: any) => {
                  const alert = await this.alertController.create({
                    header: 'Éxito',
                    message: 'AGREGADO CORRECTAMENTE',
                    buttons: ['OK'],
                  });
                  await alert.present();
      
                  // let s: any = await this.servService.getServicioById(this.serv.ID_SERVICIO).toPromise();
                  // this.serv =  s[0];
                  // console.log(this.serv);
                  this.detalle_serv = await this.servService
                    .getDetalleServicio(this.serv.ID_SERVICIO)
                    .toPromise();
                  this.calcularTotalServicio();
      
                  this.refacciones = await this.refService
                    .getRefactions()
                    .toPromise();
                  this.prod_selec = [];
                  this.total_selec = 0;
                },
                error: async (e) => {
                  // console.log(e);
                  const alert = await this.alertController.create({
                    header: 'Error',
                    message: 'ERROR AL AGREGAR EL PRODUCTO',
                    buttons: ['OK'],
                  });
                  await alert.present();
                },
              });
            });
          },
        },
      ],
    });
    await alert.present();
  }

  handleSearchChange(ev:any){
    let value = ev.target.value;
    this.productosToShow = this.productos.filter((prod: any) => {
      const term = value.toLowerCase();
      return (
        prod.DESCRIPCION.toLowerCase().includes(term)
      );
    });
  }

  eliminateProdFromList(prod_selected:any){
    if(prod_selected.CANTIDAD){
      this.total_selec -= prod_selected.PRECIO * prod_selected.CANTIDAD;
    }else{
      this.total_selec -= prod_selected.PRECIO;
    }

    this.prod_selec = this.prod_selec.filter((prod: any) => {
      return (
        prod.DESCRIPCION != prod_selected.DESCRIPCION
      );
    });
  }
}
