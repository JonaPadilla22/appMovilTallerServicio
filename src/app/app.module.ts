import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './services/firebase/firebase.service';
import { LoginModule } from './login/login.module';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { Globals } from './Global';

@NgModule({
  declarations: [AppComponent, NavComponent, ChangePasswordComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseService
    // Globals
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
