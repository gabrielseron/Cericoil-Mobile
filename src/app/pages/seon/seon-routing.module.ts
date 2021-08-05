import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeonPage } from './seon.page';

const routes: Routes = [
  {
    path: '',
    component: SeonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeonPageRoutingModule {}
