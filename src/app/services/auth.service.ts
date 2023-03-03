import { Injectable } from '@angular/core';
import { AuthData } from '../modal/auth-data';
import { Subject } from 'rxjs';
import { User } from '../modal/user';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();
  private user!: User;

  constructor(private router: Router, private snackBarService: SnackbarService){}

  //register method
  register(authData: AuthData){
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString()
    }
    this.snackBarService.success('Successfully registrated');
    this.authChange.next(true);
    this.router.navigate(['/login'])
  }

  //login method
  login(authData: AuthData){
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString()
    }
    this.snackBarService.success('Successfully logged in');
    this.authChange.next(true);
    this.router.navigate(['/welcome'])
  }

  //logout method
  logout(){
    //this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
    this.snackBarService.success('Successfully logged out');
  }

  //function that returns new user object
  getUser(){
    return {...this.user}
  }

  //function that checks if user is authenticated
  isAuth(){
    return this.user != null;
  }
}
