import { DetalleServEmpleadoPage } from './../empleado/detalle-serv-empleado/detalle-serv-empleado.page';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { ChatComponent } from './chat/chat.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeImageComponent } from './change-image/change-image.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    HeaderComponent,
    ChangeImageComponent,
    ChangePasswordComponent,
    ChatComponent,
    MensajeComponent,
    ScanQrComponent,
    DetalleServEmpleadoPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    ChangeImageComponent,
    ChangePasswordComponent,
    ChatComponent,
    MensajeComponent,
    ScanQrComponent,
    DetalleServEmpleadoPage
  ]
})
export class ComponentsModule { }
