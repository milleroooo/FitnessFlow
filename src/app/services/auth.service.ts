import { Injectable } from '@angular/core';
import { AuthData } from '../modal/auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticaced!: boolean;

  constructor(
    private router: Router,
    private snackBarService: SnackbarService,
    private fireAuth: AngularFireAuth,
    private uiService: UiService
  ) {}

  //register method
  register(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true); //progess spinner on
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(
        (res) => {
          this.uiService.loadingStateChanged.next(false); //progess spinner off
          this.snackBarService.success('Successfully registrated');
          this.sendEmailForVerification(res.user);
          this.router.navigate(['/login']);
        },
        (err) => {
          this.snackBarService.error(
            'The email address is invalid or is already in use by another account.'
          );
          this.uiService.loadingStateChanged.next(false); //progess spinner off
          this.router.navigate(['/register']);
        }
      );
  }
  //login method
  login(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true); //progess spinner on
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
          this.uiService.loadingStateChanged.next(false); //progess spinner off
          localStorage.setItem('token', 'true');
            if (res.user?.emailVerified == true) {
              this.authChange.next(true);
              this.isAuthenticaced = true;
              this.isAuth();
              this.router.navigate(['/welcome']);
              this.snackBarService.success('Successfully logged in');
            } else {
              this.router.navigate(['/login']);
              this.snackBarService.info('Please varify your email.');
              this.uiService.loadingStateChanged.next(false); //progess spinner off
            }
        },
        (err) => {
          this.snackBarService.error('Invalid email or password');
          this.uiService.loadingStateChanged.next(false); //progess spinner off
          this.router.navigate(['/login']);
        }
      );
  }

  //remind password method
  remind(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true); //progess spinner on
    this.fireAuth.sendPasswordResetEmail(authData.email).then(
      (res) => {
        this.uiService.loadingStateChanged.next(false); //progess spinner off
        this.snackBarService.success('Link has been sent on your registred email. Please verify it.');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.snackBarService.success('Invalid email.');
        this.uiService.loadingStateChanged.next(false); //progess spinner off
      }
    );
  }

  //logout method
  logout() {
    this.fireAuth.signOut();
    this.authChange.next(false);
        this.isAuthenticaced = false;
    this.snackBarService.success('Successfully logged out.');
    this.router.navigate(['/login']);
  }

  //email verification
  sendEmailForVerification(user: any) {
    console.log(user);
    user.sendEmailVerification().then(
      (res: any) => {
        this.snackBarService.success('Link has been sent on your registred email. Please verify it.');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.snackBarService.error('Something went wrong. Not able to send mail to your email.');
      }
    );
  }

   //login with google
   googleLogIn() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this.snackBarService.success('Successfully logged in with google.');
      this.router.navigate(['/welcome']);

    }, err => {
      this.snackBarService.success('Logging in with google failed.');
      this.router.navigate(['/login']);
      this.uiService.loadingStateChanged.next(false); //progess spinner off
    })
  }

  //function that checks if user is authenticated
  isAuth() {
    return this.isAuthenticaced;
  }
}
