import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from 'src/app/modal/exercise';
import { TrainingService } from 'src/app/services/training.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  exChangedSubscription!: Subscription;
  exerciseList: Exercise[] = [];

  @ViewChild(MatSort) sortExercises!: MatSort;
  @ViewChild(MatPaginator) PaginateExercise!: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exChangedSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises;
        }
      );
    this.trainingService.getCompletedOrCancelledExercises();
  }

  //Function that filters html target values from table (dataSource) and deleting whitespaces by trim(), lowercasing values by toLowerCase();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortExercises;
    this.dataSource.paginator = this.PaginateExercise;
  }

  ngOnDestroy(): void {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
