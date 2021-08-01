import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {​​ HttpClientModule }​​ from '@angular/common/http';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';

import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './modals/profil/profil.component';



@NgModule({
  declarations: [AppComponent, ForgotPasswordComponent, ProfilComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
