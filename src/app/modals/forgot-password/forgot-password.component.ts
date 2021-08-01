import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit 
{

  isErrorMail: boolean = true;


  constructor(
    private modal: ModalController,
    private toast: ToastController,
    private auth: AuthService,
    private loading: LoadingController,
    ) { }

  ngOnInit()
  {

  }

  emailCheck: string = '';

  checkEmail() 
  {
    const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    // this.isErrorMail = !regex.test(this.email);

    this.isErrorMail = (regex.test(this.emailCheck.trim())) ? false : true;
  }

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
  }

  async resetForm() 
  {
    const load = await this.loading.create(
    {
      message: 'Please wait...',
    });
    await load.present();
      this.auth.forget(this.emailCheck).then(async(data: any) =>
      {
        await this.loading.dismiss();
        if (!data.error)
        {
          const toast = await this.toast.create(
          {
            message: data.message,
            duration: 2000,
            keyboardClose: true,
            cssClass: 'mailSentToast',
          });
          toast.present();
          this.close();
        } else
        {
          const toast = await this.toast.create(
          {
            message: data.message,
            duration: 4000,
            keyboardClose: true,
            cssClass: 'mailSentToast',
          });
          toast.present();
        }
    })
  }
}
