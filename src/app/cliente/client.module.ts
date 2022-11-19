import { ServiciosPageCliente } from './servicios/servicios.page';
import { CitasPageCliente } from './citas/pendientes/citas.page';
import { RegistrarCitaPage } from './citas/registrar-cita/registrar-cita.page';
import { InicioCitasClientePage } from './citas/inicio-citas-cliente/inicio-citas-cliente.page';
import { CitasPageRoutingModule} from './client-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule
  ],
  declarations: [
    InicioCitasClientePage,
    CitasPageCliente,
    RegistrarCitaPage,
    ServiciosPageCliente
  ]
})
export class ClientPageModule {}
