
import { RegistrarVehPage } from './citas/registrar-veh/registrar-veh.page';
import { ChatClientePage } from './chat-cliente/chat-cliente.page';
import { DetalleServClientePage } from './detalle-serv-cliente/detalle-serv-cliente.page';
import { InicioCitasClientePage } from './citas/inicio-citas-cliente/inicio-citas-cliente.page';
import { InicioPageCliente } from './inicio/inicio.page';
import { DetalleCitasClientePage } from './citas/detalle-citas-cliente/detalle-citas-cliente.page';
import { ServiciosPageCliente } from './servicios/servicios.page';
import { CitasPageCliente } from './citas/pendientes/citas.page';
import { RegistrarCitaPage } from './citas/registrar-cita/registrar-cita.page';
import { CitasPageRoutingModule} from './client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { MensajeComponent } from './chat-cliente/mensaje/mensaje.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CitasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    InicioPageCliente,
    InicioCitasClientePage,
    CitasPageCliente,
    RegistrarCitaPage,
    ServiciosPageCliente,
    DetalleCitasClientePage,
    DetalleServClientePage,
    ChatClientePage,
    RegistrarVehPage,
    MensajeComponent
  ]
})
export class ClientPageModule {}
