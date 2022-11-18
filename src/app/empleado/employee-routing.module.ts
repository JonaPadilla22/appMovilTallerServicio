import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitasPage } from './citas/citas.page';
import { InicioPageTecnico } from './inicio/inicio.page';
import { ServiciosPage } from './servicios/servicios.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioPageTecnico
  },
  {
    path: 'citas',
    component: CitasPage
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
export class EmployeePageRoutingModule {}
