import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { RemindPasswordComponent } from '../auth/remind-password/remind-password.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login',   component: LoginComponent },
  { path: 'signup',  component: SignUpComponent },
  { path: 'remind',  component:RemindPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
