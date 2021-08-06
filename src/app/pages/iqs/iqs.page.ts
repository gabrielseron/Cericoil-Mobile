import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-iqs',
  templateUrl: './iqs.page.html',
  styleUrls: ['./iqs.page.scss'],
})
export class IqsPage implements OnInit
{
  iqs: any
  constructor
  (
    private storage: NativeStorage,
    private platform: Platform,
  ) { }

  async ngOnInit()
  {
    if (this.platform.is("desktop"))
    {
      this.iqs = JSON.parse(localStorage.getItem('iqs'))
    } else
    {
      this.iqs = JSON.parse(await this.storage.getItem('iqs'))
    }

    if (this.iqs.iqsDisposable == 1)
      this.iqs.iqsDisposable = true;
    else
      this.iqs.iqsDisposable = false
    
    if (this.iqs.iqsCommon == 1)
      this.iqs.iqsCommon = true;
    else
      this.iqs.iqsCommon = false
    
    if (this.iqs.iqsGeneric == 1)
      this.iqs.iqsGeneric = true;
    else
      this.iqs.iqsGeneric = false
    
    if (this.iqs.iqsDnsValid == 1)
      this.iqs.iqsDnsValid = true;
    else
      this.iqs.iqsDnsValid = false
    
    if (this.iqs.iqsHoneypot == 1)
      this.iqs.iqsHoneypot = true;
    else
      this.iqs.iqsHoneypot = false
    
    if (this.iqs.iqsFrequentComplainer == 1)
      this.iqs.iqsFrequentComplainer = true;
    else
      this.iqs.iqsFrequentComplainer = false
  }
}