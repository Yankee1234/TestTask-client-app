import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginObject } from 'src/app/models/login-object';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { RegisterObject } from 'src/app/models/register-object';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  tryLogin(loginObject: LoginObject): void {
    const query = this.httpClient.post('http://localhost:2468/auth/login/', 
    {login: loginObject.login, password: loginObject.password});
    
    query.subscribe((data) => {
      if(typeof data === 'string') {
        this.setAccessToken(JSON.parse(data).accessToken);
      }

      this.router.navigate(['home']);
    })
  }

  tryRegister(registerObject: RegisterObject): void {
    const query = this.httpClient.post('http://localhost:2468/auth/register/',
    {login: registerObject.login, email: registerObject.email, password: registerObject.password});

    query.subscribe((data) => {
      if(typeof data === 'string') {
        let message = JSON.parse(data).message;

        if(message == 'SuccessfulInserting') {
          alert('Successful registration. Now you may enter your account via login page');
          this.router.navigate(['auth/login']);
        }
      }
    })
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  isAuthorized() {
    return localStorage.getItem('accessToken') != null || undefined;
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getLogin() {
    if(this.isAuthorized()){
      let token = this.getAccessToken();

      if(typeof token === 'string') {
        let decoded = jwt_decode(token);

        if(decoded instanceof Object) {
          return Object.values(decoded)[0];
        }
      }
    }
  }

  refreshToken(): void {
    let token = this.getAccessToken();
    if(token) {
      const query = this.httpClient.post('http://localhost:2468/auth/refreshToken', {accessToken: token});
      query.subscribe((data) => {
        if(typeof data === 'string') {
          let parseData = JSON.parse(data);
          if(parseData.hasOwnProperty('accessToken')) {
            this.setAccessToken(parseData.accessToken);
          }

          else if (parseData.message == 'Unloginned') {
            alert('Time is expired. Login again');
            this.logout();
          } 
        }
      })
    }
    
  }

  redirectToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }

  logout(): void {
    this.httpClient.post('http://localhost:2468/auth/removeToken', {accessToken: localStorage.getItem('accessToken')});
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
  }
}
