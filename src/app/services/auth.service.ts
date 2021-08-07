import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
import { UserLogin, UserRegister } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  // online url
  // url: string = "https://cericoil-14740.nodechef.com" 

  // offline url
  url: string = "http://192.168.0.24:8081/auth/"

  constructor
  (
    private http: HttpClient,
  ) { }

  register(user: UserRegister)
  {
    return new Promise((resolve) => 
    {
      this.http.post(this.url +'register/', user).subscribe((data: any) => 
      {
        resolve (data)
      });
    });
  }

  login(user: UserLogin) 
  {
    return new Promise((resolve) =>
    {
      this.http.post(this.url +'login/', user).subscribe((data: any) =>
      {
        console.log({error: data.error, message:data.message, token: data.token, nameUser:data.nameUser});
        resolve (data)
      });
    });
  }

  forget(mail: string)
  {
    return new Promise((resolve) =>
    {
      this.http.post(this.url +'forget/', {mailUser: mail}).subscribe((data: any) =>
      {
        resolve (data)
      });
    })
  }

  changeMail(oldMail: string, newMail: string, pass: string)
  {
    return new Promise((resolve) =>
    {
      this.http.post(this.url +'changeMail/', {oldMailUser: oldMail, newMailUser: newMail, passUser: pass}).subscribe((data: any) =>
      {
        resolve (data)
      });
    })
  }

  changePass(mailUser: string, oldPass: string, newPass: string)
  {
    return new Promise((resolve) =>
    {
      this.http.post(this.url +'changePass/', {mailUser: mailUser, oldPass: oldPass, newPass: newPass}).subscribe((data: any) =>
      {
        resolve (data)
      });
    })
  }

  deleteAccount(mailUser: string, nameUser: string)
  {
    return new Promise((resolve) =>
    {
      this.http.post(this.url +'deleteAccount/', {mailUser: mailUser, nameUser: nameUser}).subscribe((data: any) =>
      {
        resolve (data)
      });
    })
  }
}