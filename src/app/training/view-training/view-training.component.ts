import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent implements OnInit{
  exerciseObj: any;
  id: any;

  constructor(private trainingService: TrainingService,private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getExerciseView();
  }

  //Function that fetches current exercise by id, subscribes data to object used in html event
  getExerciseView() {
    this.trainingService.getExerciseById(this.id).subscribe(data => {
      this.exerciseObj = data;
    })
  }
}
