import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-training',
  templateUrl: './success-training.component.html',
  styleUrls: ['./success-training.component.css']
})
export class SuccessTrainingComponent {

  constructor(private router:Router){}

  onComfirm(){
    this.router.navigate(['/welcome']);
  }
}
