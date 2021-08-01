import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ProfilComponent } from '../../modals/profil/profil.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit
{

  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router,
  ) {}

  ngOnInit() 
  {
    
  }

    

  async openProfil()
  {
    const modal = await this.modal.create(
    {
      component: ProfilComponent
    });
    modal.onDidDismiss().then(()=>
    {
      if (this.platform.is("desktop") && (!localStorage.getItem('token') || !localStorage.getItem('mailUser') || !localStorage.getItem('nameUser')))
      {
        this.router.navigate(['login']);
      } else if(!this.storage.getItem('token') || !this.storage.getItem('mailUser') || !this.storage.getItem('nameUser'))
      {
        this.router.navigate(['login']);
      }
    })
    return await modal.present();
  }
}
