import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {

  constructor
  (
    private modal: ModalController,
    private storage: NativeStorage,
    private platform: Platform,
    private router: Router,
  ) { }

  ngOnInit() {}

  close()
  {
    this.modal.dismiss(
      {
        'dismissed': true
      })
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
