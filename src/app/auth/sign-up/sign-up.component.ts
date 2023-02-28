import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpForm!: FormGroup;

  maxDate: Date;
  form!: NgForm;

  constructor (private authService : AuthService) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 1, 15);
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('',{ validators: [Validators.required, Validators.email] }),
      password: new FormControl('',{ validators: [Validators.required] }),
      birthdate: new FormControl('',{ validators: [Validators.required] }),
      agree: new FormControl('',{ validators: [Validators.required] }),
    })
  }

  onSubmit(){
    this.authService.register({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    });
  }
}
