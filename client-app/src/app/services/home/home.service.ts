import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileObject } from 'src/app/models/profile-object';
import { AuthService } from '../authorize/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  isProfileExists: boolean = false;
  profile: any = null;

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  getProfile(): void {
    const query = this.httpClient.post('http://localhost:2468/profile/getProfile', {login: this.authService.getLogin()});

    query.subscribe((data) => {
      if(typeof data === 'string') {
        let parseData = JSON.parse(data);
        this.isProfileExists = this.isProfileFound(parseData.message);
        if(this.isProfileExists) {
          this.profile = new ProfileObject(this.authService.getLogin(),
            parseData.profile.name, parseData.profile.surname, parseData.profile.birthday);
        }
      }
    })
  }

  setProfile(profile: ProfileObject): void {
    const query = this.httpClient.post('http://localhost:2468/profile/setProfile', 
    { userLogin: this.authService.getLogin(), name: profile.name, surname: profile.surname, birthday: profile.birthday});

    query.subscribe((data) => {})
    
    this.getProfile();
  }

  updateProfile(profile: ProfileObject): void {
    const query = this.httpClient.post('http://localhost:2468/profile/updateProfile', 
    { userLogin: this.authService.getLogin(), name: profile.name, surname: profile.surname, birthday: profile.birthday});

    query.subscribe((data) => {})
    
    this.getProfile();
  }

  isProfileFound(message: string): boolean {
    console.log(message);
    if(message == 'HasFound') {
      return true;
    }
    else return false;
  }
}
