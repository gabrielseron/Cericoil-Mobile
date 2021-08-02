import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ProfilComponent } from '../../modals/profil/profil.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit
{

  nameUser : any

  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
  ) {}

  

  async ngOnInit() 
  {
    if (this.platform.is("desktop"))
    {
      this.nameUser = localStorage.getItem('nameUser')
    } else
    {
      this.nameUser = await this.storage.getItem('nameUser')
      this.nameUser = this.nameUser.replace(/['"]+/g, '')
    }
  }


  async openProfil()
  {
    const modal = await this.modal.create(
    {
      component: ProfilComponent
    });
    return await modal.present();
  }
}
