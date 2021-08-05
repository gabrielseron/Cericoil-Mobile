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
  }

}
