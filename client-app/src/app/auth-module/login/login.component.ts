import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginObject } from 'src/app/models/login-object';
import { AuthService } from 'src/app/services/authorize/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit() {
    let login = new LoginObject(
      this.loginForm.controls['login'].value,
      this.loginForm.controls['password'].value
    );

    this.authService.tryLogin(login);
  }

  redirectToRegister(){
     this.router.navigate(['auth/register']);
  }

}
