import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeonPageRoutingModule } from './seon-routing.module';

import { SeonPage } from './seon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeonPageRoutingModule
  ],
  declarations: [SeonPage]
})
export class SeonPageModule {}
