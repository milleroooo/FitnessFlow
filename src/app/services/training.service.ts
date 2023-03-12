import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../modal/exercise';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  availableExercises: Exercise[] = []
  runningExercise!: Exercise;
  finishedExercises: Exercise[] = [];

  constructor(private router: Router, private afs: AngularFirestore, private snackBar: SnackbarService) { }

  //Function that returns Exercise interface from Firestore database
  getAvailableExercises() {
    this.afs.collection('availableExercises').snapshotChanges()
      .pipe(
        map(docArray => docArray.map(doc => {
          const data: any = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            name: data.name,
            duration: data.duration,
            calories: data.calories,
            image: data.image,
            difficulty: data.difficulty
          };
        }))
      ).subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
     });
  }

  //Function that starts Exercise (selected by specified Id)
  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId)!;
    this.exerciseChanged.next({...this.runningExercise});
    this.snackBar.info('Training started');
  }

  //Function that pushes exercises, which are completed to exerciseList and changes its state to 'completed'
  completedExercise(){
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'});
    this.runningExercise = null!;
    this.exerciseChanged.next(null!);
    this.router.navigate(['/success']);
}

  //Function that pushes exercises, which are cancelled to exerciseList and changes its state to 'cancelled'
  canceledExercise(progress: number){
    this.addDataToDatabase({
    ...this.runningExercise,
     date: new Date(),
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

  getExerciseById(id : any) {
    return this.afs.doc("/availableExercises/"+id).valueChanges();
  }

  //Function that pushes exercises regardless of the state of exercise
  getCompletedOrCancelledExercises(){
    this.afs
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: unknown[]): void => {
      this.finishedExercisesChanged.next(exercises as Exercise[]);
    });
  }

  //Function that add exercise to new collection in Firebase
  private addDataToDatabase(exercise : Exercise){
   return this.afs.collection('/finishedExercises').add(exercise);
  }

}
