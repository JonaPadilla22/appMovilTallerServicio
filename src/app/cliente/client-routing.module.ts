import { RegistrarVehPage } from './citas/registrar-veh/registrar-veh.page';
import { DetalleServClientePage } from './detalle-serv-cliente/detalle-serv-cliente.page';
import { InicioCitasClientePage } from './citas/inicio-citas-cliente/inicio-citas-cliente.page';
import { DetalleCitasClientePage } from './citas/detalle-citas-cliente/detalle-citas-cliente.page';
import { RegistrarCitaPage } from './citas/registrar-cita/registrar-cita.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        path: 'detalleCita',
        component: DetalleCitasClientePage
      },
      {
        path: '',
        component: RegistrarCitaPage
      }
    ]
  },
  {
    path: 'servicios',
    component: ServiciosPageCliente
  },
  {
    path: 'detalleServicio',
    component: DetalleServClientePage
  },
  {
    path: 'registrar-veh',
    component: RegistrarVehPage
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasPageRoutingModule {}
