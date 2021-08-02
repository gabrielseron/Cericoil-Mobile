import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AnalyzeService
{

  // online url
  // url: string = "https://cericoil-14740.nodechef.com" 

  // offline url
  url: string = "http://192.168.0.24:8081/verif/"

  constructor
  (
    private http: HttpClient,

  ) { }

  verif(mail: string, name: string)
  {
    return new Promise((resolve) =>
    {
      this.http.post(this.url +'/', {nameUser: name, fraudVerificationMail: mail}).subscribe((data: any) =>
      {
        resolve (data)
      });
    })
  }
}
