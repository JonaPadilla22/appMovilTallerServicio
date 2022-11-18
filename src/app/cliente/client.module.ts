import { CitasPageCliente } from './citas/citas.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CitasPageRoutingModule } from './client-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule
  ],
  declarations: [
    CitasPageCliente
  ]
})
export class ClientPageModule {}
