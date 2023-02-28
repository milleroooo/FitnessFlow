import { Component, Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private readonly snackBar: MatSnackBar) { }

  openSnackBar(
    message: string,
    action: string,
    className: 'success-snackbar',
    duration = 1000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
      horizontalPosition:'right'
    });
  }

  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  error(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }
}
