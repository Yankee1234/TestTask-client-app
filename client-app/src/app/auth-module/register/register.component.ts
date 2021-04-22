import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterObject } from 'src/app/models/register-object';
import { AuthService } from 'src/app/services/authorize/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data = [];

  registerForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$')]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let register = new RegisterObject(
      this.registerForm.controls['login'].value,
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value
    )

    this.authService.tryRegister(register);
  }

  redirectToLogin() {
    console.log('Redirect to login');
    this.router.navigate(['auth/login']);
  }
}
