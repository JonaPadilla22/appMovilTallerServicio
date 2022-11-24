import { ServiciosPage } from './servicios/servicios.page';
import { InicioPageTecnico } from './inicio/inicio.page';
import { CitasPage } from './citas/citas.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EmployeePageRoutingModule } from './employee-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    CitasPage,
    InicioPageTecnico,
    ServiciosPage
  ]
})
export class EmployeePageModule {}
