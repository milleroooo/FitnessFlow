import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure</h1>
  <mat-dialog-content>
    <p>You already got {{ passedData.progress }}%</p>
  </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="stopTrainingNotification()" [mat-dialog-close]="true">Yes</button>
        <button mat-button (click)="resumeTrainingNotification()" [mat-dialog-close]="false">No</button>
      </mat-dialog-actions>
  `,
})

export class StopTrainingComponent {

constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private snackBarService: SnackbarService ){ }

stopTrainingNotification(){
  this.snackBarService.success('Training stopped');
}

resumeTrainingNotification(){
  this.snackBarService.success('Training resumed');
}

}
