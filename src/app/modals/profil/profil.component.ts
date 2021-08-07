import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { IntPropComponent } from '../../popover/int-prop/int-prop.component';
import { ChangeMailComponent } from '../../popover/change-mail/change-mail.component';
import { ChangePassComponent } from '../../popover/change-pass/change-pass.component';
import { AuthService } from '../../services/auth.service';
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
    private popover: PopoverController,
    private alert: AlertController,
    private toast: ToastController,
    private auth: AuthService,
    private loading: LoadingController,
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

  

  async changeMail()
  {
    const popover = await this.popover.create(
      {
      component: ChangeMailComponent,
      translucent: true
      }
    )
    return await popover.present();
  }

  async changePass()
  {
    const popover = await this.popover.create(
      {
      component: ChangePassComponent,
      translucent: true
      }
    )
    return await popover.present();
  }

  async deleteAccount()
  {
    const alert = await this.alert.create(
    {
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account ?',
      buttons:
      [
        "Cancel",
        {
          text: 'Delete',
          handler: async () => 
          {
            const load = await this.loading.create(
            {
              message: 'Please wait...',
            });
            await load.present();

            this.auth.deleteAccount(this.mailUser, this.nameUser).then(async(data: any) =>
            {
              await this.loading.dismiss();
              if (!data.error)
              {
                if (this.platform.is("desktop"))
                  localStorage.clear()
                else
                  await this.storage.clear();
                
                this.mailUser = ""
                this.nameUser = ""
                const toast = await this.toast.create(
                {
                  message: 'Account Deleted',
                  duration: 2000
                });
                toast.present();
                this.router.navigate(['/login']);
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
        }
      ]
    })
    await alert.present();
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
