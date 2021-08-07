import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserLogin } from 'src/app/interfaces/user';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';

@Component(
{
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{

  user: UserLogin =
  {
    mailUser: '',
    passUser: ''
  }

  constructor
  (
    private modal: ModalController,
    private loading: LoadingController,
    private router: Router,
    private auth: AuthService,
    private platform: Platform,
    private storage: NativeStorage,
    private toast: ToastController,
  ) { }

  isErrorMail: boolean = true

  async ngOnInit()
  {
    let token;
    if (this.platform.is("desktop"))
    {
      token = localStorage.getItem('token')
    } else
    {
      token = await this.storage.getItem('token')
    }
    if (token !== undefined && token !== null)
      this.router.navigate(['/home'])
  }

  async forgotPassword() 
  {
    const modal = await this.modal.create(
      {
      component: ForgotPasswordComponent,
      });
      return await modal.present();
  }

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    this.isErrorMail = (regex.test(this.user.mailUser.trim())) ? false : true;
  }

  async loginForm() 
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();
    console.log(this.user);
    
    this.auth.login(this.user).then(async(data: any) =>
    {
      await this.loading.dismiss();
      if (!data.error)
      {
        if (this.platform.is("desktop"))
        {
          localStorage.setItem('token', data.token)
          localStorage.setItem('mailUser', this.user.mailUser)
          localStorage.setItem('nameUser', data.nameUser)
        } else
        {
          await this.storage.setItem('token', data.token)
          await this.storage.setItem('mailUser', this.user.mailUser)
          await this.storage.setItem('nameUser', JSON.stringify(data.nameUser))
        }
          this.user.mailUser = ""
          this.user.passUser = ""
          const toast = await this.toast.create(
          {
            message: 'Connected !',
            duration: 2000
          });
          toast.present();
          this.router.navigate(['/home'])
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
