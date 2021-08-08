import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-change-mail',
  templateUrl: './change-mail.component.html',
  styleUrls: ['./change-mail.component.scss'],
})
export class ChangeMailComponent implements OnInit
{
  mailUser: string = ''
  newMailUser: string = ''
  passUser: string = ''
  isErrorMail: boolean
  constructor
  (
    private loading: LoadingController,
    private auth: AuthService,
    private platform: Platform,
    private storage: NativeStorage,
    private toast: ToastController,
    private popover: PopoverController

  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
      this.mailUser = localStorage.getItem('mailUser')
    else
    {
      this.mailUser = await this.storage.getItem('mailUser')
      this.mailUser = this.mailUser.replace(/['"]+/g, '')
    }
  }

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    this.isErrorMail = (regex.test(this.mailUser.trim())) ? false : true;
  }

  async changeMail()
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();

    this.auth.changeMail(this.mailUser, this.newMailUser, this.passUser).then(async(data: any) =>
    {
      await this.loading.dismiss();
      if (!data.error)
      {
        if (this.platform.is("desktop"))
        {
          localStorage.setItem('mailUser', this.newMailUser)
        } else
        {
          await this.storage.setItem('mailUser', this.newMailUser)
        }
        this.mailUser = ""
        this.passUser = ""
        const toast = await this.toast.create(
        {
          message: 'Email Changed !',
          duration: 2000
        });
        this.popover.dismiss(
        {
          'dismissed': true
        })
        toast.present();
      }else
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
}
