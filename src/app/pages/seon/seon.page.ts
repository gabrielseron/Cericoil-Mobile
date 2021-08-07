import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-seon',
  templateUrl: './seon.page.html',
  styleUrls: ['./seon.page.scss'],
})
export class SeonPage implements OnInit
{

  seon: any
  constructor
  (
    private storage: NativeStorage,
    private platform: Platform,
  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
    {
      this.seon = JSON.parse(localStorage.getItem('seon'))
    } else
    {
      this.seon = JSON.parse(await this.storage.getItem('seon'))
    }

    if (this.seon.seonDisposable == 1)
      this.seon.seonDisposable = true;
    else
      this.seon.seonDisposable = false
    if (this.seon.seonDeliverable == 1)
      this.seon.seonDeliverable = true;
    else
      this.seon.seonDeliverable = false
    if (this.seon.seonFree == 1)
      this.seon.seonFree = true;
    else
      this.seon.seonFree = false
    if (this.seon.seonCustom == 1)
      this.seon.seonCustom = true;
    else
      this.seon.seonCustom = false
    if (this.seon.seonSuspiciousTld == 1)
      this.seon.seonSuspiciousTld = true;
    else
      this.seon.seonSuspiciousTld = false
    if (this.seon.seonWebsiteExist == 1)
      this.seon.seonWebsiteExist = true;
    else
      this.seon.seonWebsiteExist = false
    if (this.seon.seonFacebookExist == 1)
      this.seon.seonFacebookExist = true;
    else
      this.seon.seonFacebookExist = false
    if (this.seon.seonGoogleExist == 1)
      this.seon.seonGoogleExist = true;
    else
      this.seon.seonGoogleExist = false
    if (this.seon.seonTwitterExist == 1)
      this.seon.seonTwitterExist = true;
    else
      this.seon.seonTwitterExist = false
    if (this.seon.seonMicrosoftExist == 1)
      this.seon.seonMicrosoftExist = true;
    else
      this.seon.seonMicrosoftExist = false
    if (this.seon.seonLinkedinExist == 1)
      this.seon.seonLinkedinExist = true;
    else
      this.seon.seonLinkedinExist = false
    if (this.seon.seonDiscordExist == 1)
      this.seon.seonDiscordExist = true;
    else
      this.seon.seonDiscordExist = false
    if (this.seon.seonAmazonExist == 1)
      this.seon.seonAmazonExist = true;
    else
    this.seon.seonAmazonExist = false
  }

}
