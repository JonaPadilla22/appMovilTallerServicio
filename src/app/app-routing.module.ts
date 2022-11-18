import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    loadChildren: () => import('./empleado/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./cliente/client.module').then( m => m.ClientPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
