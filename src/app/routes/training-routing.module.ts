import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.guard';

import { SuccessTrainingComponent } from '../training/success-training/success-training.component';
import { TrainingComponent } from '../training/training.component';
import { ViewTrainingComponent } from '../training/view-training/view-training.component';

const routes: Routes = [
  { path: 'training',   component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'success',    component: SuccessTrainingComponent },
  { path: 'view',       component: ViewTrainingComponent },
  { path: 'view/:id',   component: ViewTrainingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class TrainingRoutingModule {}
