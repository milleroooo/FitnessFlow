import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../modal/exercise';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  constructor(private router: Router) { }

  availableExercises : Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 3, calories: 8, difficulty:'easy', image: '../../assets/images/Activity1.png' },
    { id: 'touch-toes', name: 'Touch Toes', duration: 100, calories: 15, difficulty:'medium', image: '../../assets/images/Activity2.png' },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18, difficulty:'advanced', image: '../../assets/images/Activity3.png' },
    { id: 'burpees', name: 'Burpees', duration: 140, calories: 8, difficulty:'hard', image: '../../assets/images/Activity4.png' }
  ];
  runningExercise!: Exercise;
  exerciseList: Exercise[] = [];

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId)!;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completedExercise(){
    this.exerciseList.push({...this.runningExercise, date: new Date(),
      state: 'completed'});
    this.runningExercise = null!;
    this.exerciseChanged.next(null!);
    this.router.navigate(['/success']);
  }

  canceledExercise(progress: number){
    this.exerciseList.push({...this.runningExercise, date: new Date(),
     state: 'cancelled',
     duration: this.runningExercise.duration * (progress / 100),
     calories:this.runningExercise.calories  * (progress / 100)
    });
    this.runningExercise = null!;
    this.exerciseChanged.next(null!);
  }

  getRunningExercise(){
    return {... this.runningExercise};
  }

  //Function that returns copy of a Exercise interface
  getCompletedOrCancelledExercises(){
    return this.exerciseList.slice();
  }
}
