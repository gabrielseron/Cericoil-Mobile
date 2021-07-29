import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';
import { UserLogin } from '../interfaces/user-login';

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
          rejects (data.message)
        else
          resolve (data)
        });
    });
  }
}