import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPageCliente } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPageCliente
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
