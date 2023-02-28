import { Component } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styles: []
})
export class SnackbarComponent {

  constructor(public snackbarService : SnackbarService, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 0,
      panelClass: [className]
    });
  }
}
