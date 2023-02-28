import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../modal/exercise';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  constructor() { }

  availableExercises : Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8, difficulty:'easy', image: '../../assets/images/Activity1.png' },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15, difficulty:'medium', image: '../../assets/images/Activity2.png' },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18, difficulty:'advanced', image: '../../assets/images/Activity3.png' },
    { id: 'burpees', name: 'Burpees', duration: 600, calories: 8, difficulty:'hard', image: '../../assets/images/Activity4.png' }
  ];
  runningExercise!: Exercise;

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId)!;
    this.exerciseChanged.next({...this.runningExercise});
    console.log(this.runningExercise);
    console.log(this.availableExercises);
    console.log(this.exerciseChanged);
  }

  getRunningExercise(){
    return {... this.runningExercise};
  }

}
