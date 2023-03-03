import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SuccessTrainingComponent } from './training/success-training/success-training.component';

const routes: Routes = [
  {path:'',           component:WelcomeComponent},
  {path:'signup',     component:SignUpComponent},
  {path:'login',      component:LoginComponent},
  {path:'training',   component:TrainingComponent, canActivate: [AuthGuard]},
  {path:'welcome',   component:WelcomeComponent, canActivate: [AuthGuard]},
  {path:'success',   component:SuccessTrainingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
