import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserRegister } from 'src/app/interfaces/user';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit
{

  user: UserRegister =
  {
    nameUser:'',
    mailUser: '',
    passUser: '',
  }
  rePassUser: string = ''

  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private router: Router,
    private auth: AuthService,
    private platform: Platform,
    private storage: NativeStorage,
    private toast: ToastController,
  ) { }

  isErrorMail: boolean = true

  ngOnInit() {
  }

  checkEmail() 
  {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.isErrorMail = (regex.test(this.user.mailUser.trim())) ? false : true;
    console.log(this.isErrorMail);
  }


  async registerForm() 
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();

    this.auth.register(this.user).then(async(data: any) =>
    {
      await this.loading.dismiss();
      if (!data.error)
      {
        const toast = await this.toast.create(
        {
          message: "Your account has been created",
          duration: 2000
        });
        toast.present();
        this.router.navigate(['/login'])
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
