import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from 'src/app/modal/exercise';
import { TrainingService } from 'src/app/services/training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exerciseList!: Exercise[];
  isLoading = true;
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exerciseList = exercises;
        this.isLoading = false;
      }
    );
    this.trainingService.getAvailableExercises();
  }

  //Function that starts current training by selecting id from form value
  onStartTraining(form: NgForm) {
    const selectedId = form.value.exercise;
    this.trainingService.startExercise(selectedId);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
