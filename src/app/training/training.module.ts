import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SuccessTrainingComponent } from './success-training/success-training.component';
import { ViewTrainingComponent } from './view-training/view-training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from '../routes/training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
    SuccessTrainingComponent,
    ViewTrainingComponent,
    NewTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
