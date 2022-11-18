import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class LoginModule { }
