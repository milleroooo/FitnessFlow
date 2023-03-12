import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';

import { WelcomeComponent } from './welcome/welcome.component';
import { StarterPageComponent } from './starter-page/starter-page.component';

const routes: Routes = [
  {path:'',           component:StarterPageComponent},
  {path:'welcome',    component:WelcomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
