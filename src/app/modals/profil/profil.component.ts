import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, PopoverController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { IntPropComponent } from '../../popover/int-prop/int-prop.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit
{

  nameUser : string
  mailUser: string
  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router,
    private popover: PopoverController
  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
    {
      this.nameUser = localStorage.getItem('nameUser')
      this.mailUser = localStorage.getItem('mailUser')
    } else
    {
      this.nameUser = await this.storage.getItem('nameUser')
      this.nameUser = this.nameUser.replace(/['"]+/g, '')

      this.mailUser = await this.storage.getItem('mailUser')
      this.mailUser = this.mailUser.replace(/['"]+/g, '')
    }
  }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }

  async intProp()
  {
    const popover = await this.popover.create(
      {
      component: IntPropComponent,
      translucent: true
      }
    )
    return await popover.present();
  }

  async logout()
  {
    if (this.platform.is("desktop"))
      {
        localStorage.clear()
      } else
      {
        await this.storage.clear();
      }
    this.close()
    this.router.navigate(['login']);
  }
}
