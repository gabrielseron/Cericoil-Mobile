import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FraudVerifService
{
  // online url
  // url: string = "https://cericoil-14740.nodechef.com" 

  // offline url
  url: string = "http://localhost:8081/verif"
  constructor
  (
    private http: HttpClient,
  ) { }

  register(mail: string, nameUser: string)
  { 
    return new Promise((resolve, rejects) => 
    {
      this.http.post(this.url +'/', {nameUser: nameUser, fraudVerificationMail: mail}).subscribe((data: any) => 
      {
          (!data.message) ? rejects(data.message): resolve(data);
      });
    });
  }
}



  

