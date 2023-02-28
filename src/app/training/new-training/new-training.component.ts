import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/auth/modal/exercise';
import { TrainingService } from 'src/app/auth/services/training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{

  exerciseList: Exercise[] = [];

  constructor(private trainingService : TrainingService) {}

  ngOnInit(): void {
    this.exerciseList = this.trainingService.availableExercises;
  }

  onStartTraining(form: NgForm) {
    const selectedId = form.value.exercise;
    this.trainingService.startExercise(selectedId);
  }

}
