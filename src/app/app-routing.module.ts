import { InicioPageTecnico } from './empleado/inicio/inicio.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicioCliente',
    pathMatch: 'full'
  },
  {
    path: 'inicioCliente',
    loadChildren: () => import('./cliente/inicio/inicio.module').then( m => m.InicioPageClienteModule)
  },
  {
    path: 'inicioTecnico',
    loadChildren: () => import('./empleado/inicio/inicio.module').then( m => m.InicioPageEmpleadoModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./cliente/citas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./cliente/servicios/servicios.module').then( m => m.ServiciosPageModule)
  }
];

// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   {
//     path: '',
//     children: [
//       {
//         path: 'tecnico',
//         children: [
//           {
//             path: '',
//             redirectTo: 'inicio',
//             pathMatch: 'full',
//           },
//           {
//             path: 'inicio',
//             component: InicioPageTecnico,
//           },
//           {
//             path: 'pendientes',
//             component: CitasPendientesComponent,
//           },
//         ],
//       },
//       {
//         path: 'taller',
//         children: [
//           {
//             path: '',
//             redirectTo: 'serviciosPendientes',
//             pathMatch: 'full',
//           },
//           {
//             path: 'serviciosPendientes',
//             component: ServiciosPendientesComponent,
//           },
//           {
//             path: 'historialServicio',
//             component: HistorialServiciosComponent,
//           },
//           {
//             path: 'ingresoSinCita',
//             component: IngresoSinCitaComponent,
//           },
//         ],
//       },
//       {
//         path: 'usuarios',
//         pathMatch: 'full',
//         component: GestionUsuariosComponent,
//       },
//       {
//         path: 'recursos',
//         pathMatch: 'full',
//         component: GestionRefaccionesComponent,
//       },
//     ],
//   },
// ];





@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
