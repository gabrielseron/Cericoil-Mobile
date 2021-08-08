import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit
{
  mailUser: string = ''
  newPassUser: string = ''
  passUser: string = ''
  reNewPassUser: string = ""
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
    console.log(this.mailUser);
  }

  async changePass()
  {
    const load = await this.loading.create(
      {
        message: 'Please wait...',
      });
      await load.present();
  
      this.auth.changePass(this.mailUser, this.passUser, this.newPassUser).then(async(data: any) =>
      {
        await this.loading.dismiss();
        if (!data.error)
        {
          this.newPassUser = ""
          this.passUser = ""
          const toast = await this.toast.create(
          {
            message: 'Password Changed !',
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