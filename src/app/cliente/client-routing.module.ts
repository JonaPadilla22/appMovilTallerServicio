import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitasPageCliente } from './citas/citas.page';
import { InicioPageCliente } from './inicio/inicio.page';
import { ServiciosPage } from './servicios/servicios.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioPageCliente
  },
  {
    path: 'citas',
    component: CitasPageCliente
  },
  {
    path: 'servicios',
    component: ServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasPageRoutingModule {}
