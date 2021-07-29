import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserLogin } from 'src/app/interfaces/user';

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
    console.log(token);
    if (token !== undefined && token !== null)
      this.router.navigate(['/tab'])
  }

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    // this.isErrorMail = !regex.test(this.email);
    this.isErrorMail = (regex.test(this.user.mailUser.trim())) ? false : true;
    console.log(this.isErrorMail);
  }

  async loginForm() 
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();

    this.auth.login(this.user).then(async(user: any) =>
    {
      console.log(this.platform.platforms());
      if (this.platform.is("desktop"))
      {
        localStorage.setItem('token', user.token)
        localStorage.setItem('mailUser', this.user.mailUser)
        localStorage.setItem('nameUser', user.nameUser)
      } else
      {
        await this.storage.setItem('token', user.token)
        await this.storage.setItem('mailUser', this.user.mailUser)
        await this.storage.setItem('nameUser', user.nameUser)
      }
        await this.loading.dismiss();
        this.router.navigate(['/tab'])
    }).catch(async() =>
    {
      await this.loading.dismiss();
      this.router.navigate(['/tab'])
    })
  }

}
