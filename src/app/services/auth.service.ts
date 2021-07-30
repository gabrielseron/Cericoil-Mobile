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
  url: string = "http://localhost:8081/auth/"

  constructor
  (
    private http: HttpClient,
  ) { }

  register(user: UserRegister)
  { 
    return new Promise((resolve, rejects) => 
    {
      this.http.post(this.url +'register/', user).subscribe((data: any) => 
      {
          (!data.message) ? rejects(data.message): resolve(data);
      });
    });
  }

  login(user: UserLogin) 
  {
    return new Promise((resolve, rejects) =>
    {
      this.http.post(this.url +'login/', user).subscribe((data: any) =>
      {      
        if (!data.token)
          rejects ("An error has occured")
        else
          resolve (data)
      });
    });
  }

  forget(mail: string)
  {
    return new Promise((resolve, rejects) =>
    {
      this.http.post(this.url +'forget/', {mailUser: mail}).subscribe((data: any) =>
      {      
        resolve ({error: data.error, message:data.message})
      });
    })
  }
}