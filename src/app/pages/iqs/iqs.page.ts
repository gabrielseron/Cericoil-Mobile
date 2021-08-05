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
  }
}