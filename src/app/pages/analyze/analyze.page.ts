import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.page.html',
  styleUrls: ['./analyze.page.scss'],
})
export class AnalyzePage implements OnInit {

  iqs: any
  constructor
  (
    private router: Router,

  ) { }

  async ngOnInit()
  {
  }

  close()
  {
    this.router.navigate(['/home'])
  }

}
