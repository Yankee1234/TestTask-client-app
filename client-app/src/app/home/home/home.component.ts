import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileObject } from 'src/app/models/profile-object';
import { AuthService } from 'src/app/services/authorize/auth.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  updateVisible: boolean = false;

  profileForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('^[A-Z][-a-zA-Z]+$'), Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.pattern('^[A-Z][-a-zA-Z]+$'), Validators.minLength(2)]],
    birthday: ['', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$')]]
  })

  constructor(private authService: AuthService, private homeService: HomeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.homeService.getProfile();
    if(this.getProfileExists()) {
      this.putProfileToForm();
    }
  }

  getProfile() {
    return this.homeService.profile;
  }

  getLogin(){
    return this.authService.getLogin();
  }

  getProfileExists(): boolean {
    return this.homeService.isProfileExists;
  }

  putProfileToForm(): void {
    this.profileForm.setValue({
      name: this.homeService.profile.name,
      surname: this.homeService.profile.surname,
      birthday: this.homeService.profile.birthday
    })
  }

  setProfileForm() {
    let profile = new ProfileObject(this.getLogin(),
      this.profileForm.controls['name'].value,
      this.profileForm.controls['surname'].value,
      this.profileForm.controls['birthday'].value
    )

    this.homeService.setProfile(profile);
    this.putProfileToForm();
  }

  updateProfileForm() {
    let profile = new ProfileObject(this.getLogin(),
      this.profileForm.controls['name'].value,
      this.profileForm.controls['surname'].value,
      this.profileForm.controls['birthday'].value
    )

    this.homeService.updateProfile(profile);
    this.putProfileToForm();
    this.changeVisible();
  }

  logout() {
    this.authService.logout();
  }

  changeVisible(): void {
    if(!this.updateVisible){
      this.updateVisible = true;
    }
    else this.updateVisible = false;
  }

}
