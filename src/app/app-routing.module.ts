import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },  {
    path: 'analyze',
    loadChildren: () => import('./pages/analyze/analyze.module').then( m => m.AnalyzePageModule)
  },
  {
    path: 'iqs',
    loadChildren: () => import('./pages/iqs/iqs.module').then( m => m.IqsPageModule)
  },
  {
    path: 'seon',
    loadChildren: () => import('./pages/seon/seon.module').then( m => m.SeonPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
