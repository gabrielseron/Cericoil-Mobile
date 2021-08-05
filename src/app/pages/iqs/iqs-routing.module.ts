import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IqsPage } from './iqs.page';

const routes: Routes = [
  {
    path: '',
    component: IqsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IqsPageRoutingModule {}
