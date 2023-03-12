import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  maxDate: Date;
  form!: NgForm;

  isLoading = false;
  loadingSubscription!: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 1, 15);
  }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.signUpForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      birthdate: new FormControl('', { validators: [Validators.required] }),
      agree: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    this.authService.register({
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
