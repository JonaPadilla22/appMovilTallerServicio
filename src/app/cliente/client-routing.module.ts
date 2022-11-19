

import { RegistrarCitaPage } from './citas/registrar-cita/registrar-cita.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioCitasClientePage } from './citas/inicio-citas-cliente/inicio-citas-cliente.page';
import { InicioPageCliente } from './inicio/inicio.page';
import { CitasPageCliente } from './citas/pendientes/citas.page';
import { ServiciosPageCliente } from './servicios/servicios.page';


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
    component: InicioCitasClientePage,
    children: [
      {
        path: 'registrar',
        component: RegistrarCitaPage
      },
      {
        path: 'pendientes',
        component: CitasPageCliente
      },
      {
        path: '',
        component: RegistrarCitaPage
      }
    ]
    // children: [
    //   {
    //     path: 'registrar',
    //     component: RegistrarCitaPage
    //   },
    //   {
    //     path: 'pendientes',
    //     component: CitasPageCliente
    //   },
    //   {
    //     path: '',
    //     redirectTo: 'client/citas/registrar',
    //     pathMatch: 'full'
    //   }
    // ]
  },
  {
    path: 'servicios',
    component: ServiciosPageCliente
  },
  {
    path: 'inicio',
    component: InicioPageCliente
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasPageRoutingModule {}
