import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-seon',
  templateUrl: './seon.page.html',
  styleUrls: ['../iqs/iqs.page.scss'],
})
export class SeonPage implements OnInit
{

  seon: any
  domain: string
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

    delete this.seon.table

    for (let [key, value] of Object.entries(this.seon))
    {
        if (key != "seonScore" && key != "seonAddedBy" && key != "seonMail")
        {
            if (value == 0)
              this.seon[key] = false
            else
              this.seon[key] = true
        }
    };

    this.domain = this.seon.seonMail.split("@").pop();
  }

}
