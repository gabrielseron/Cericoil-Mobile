import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyzePage } from './analyze.page';
import { IqsPageModule } from '../iqs/iqs.module';

const routes: Routes =
[
  {
    path: '',
    component: AnalyzePage,
    children:
    [
      {
        path: 'iqs',
        children:
        [
          {
            path: '',
            loadChildren: ()=> import('../iqs/iqs.module').then(m => m.IqsPageModule)
          }
        ]
      },
      {
        path: 'seon',
        children:
        [
          {
            path: '',
            loadChildren: ()=> import('../seon/seon.module').then(m => m.SeonPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/analyze/iqs',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyzePageRoutingModule {}
