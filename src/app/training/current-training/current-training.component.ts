import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/auth/services/training.service';
import { Exercise } from 'src/app/auth/modal/exercise';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer!: number;
  excerciseList: Exercise[] = [];

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit(): void {
   this.excerciseList = this.trainingService.availableExercises;
   this.startOrResumeTimer();
  }

  //Function that resumes timer up to X seconds
  startOrResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration / 1000 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if(this.progress >= 100){
        clearInterval(this.timer);
      }
    }, step);
  }

  //Function that stop timer
  onStopTimer(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
      progress : this.progress
    }});

    //Dialog confirmation & close
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }

}
