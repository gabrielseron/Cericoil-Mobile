import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, LoadingController, ToastController } from '@ionic/angular';
import { ProfilComponent } from '../../modals/profil/profil.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AnalyzeService } from '../../services/analyze.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit
{

  nameUser : string
  welcomeMessage : string
  isErrorMail: boolean = true
  analyzedMail: string

  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private loading: LoadingController,
    private router: Router,
    private toast: ToastController,
    private analyze: AnalyzeService,
  ) {}

  

  async ngOnInit() 
  {
    if (this.platform.is("desktop"))
    {
      this.nameUser = localStorage.getItem('nameUser')

      localStorage.removeItem('iqs')
      localStorage.removeItem('seon')
    } else
    {
      this.nameUser = await this.storage.getItem('nameUser')
      this.nameUser = this.nameUser.replace(/['"]+/g, '')

      await this.storage.remove('iqs')
      await this.storage.remove('seon')
    }

    this.welcomeMessage = this.getHours()
  }

  getHours()
  {
    const date = new Date()
    if (date.getHours() > 7 && date.getHours() < 13)
    {
      return "Good morning "
    } else if (date.getHours() > 12 && date.getHours() < 17)
    {
      return "Good afternoon "
    } else if (date.getHours() > 16 && date.getHours() < 21)
    {
      return "Good evening "
    } else
    {
      return "Good night "
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

  async analyzeMail()
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();

    this.analyze.verif(this.analyzedMail, this.nameUser).then(async(data: any) =>
    {
      await this.loading.dismiss();

      if (!data.error)
      {
        if (this.platform.is("desktop"))
        {
          await localStorage.setItem('iqs', JSON.stringify(data.iqs))
          await localStorage.setItem('seon', JSON.stringify(data.seon))
        } else
        {
          await this.storage.setItem('iqs', JSON.stringify(data.iqs))
          await this.storage.setItem('seon', JSON.stringify(data.seon))
        }
        this.analyzedMail = ""
        this.router.navigate(['/analyze'])
      } else
      {
        const toast = await this.toast.create(
        {
          message: data.message,
          duration: 8000
        });
        toast.present();
      }
    })
  }

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    this.isErrorMail = (regex.test(this.analyzedMail.trim())) ? false : true;
  }
}
