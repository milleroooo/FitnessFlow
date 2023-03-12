import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from '../routes/auth-routing.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RemindPasswordComponent } from './remind-password/remind-password.component';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    RemindPasswordComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}
