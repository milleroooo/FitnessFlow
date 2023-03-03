import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

 @Output() sidenavClose = new EventEmitter<void>;

 isAuth = false;
 authSubscription!: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSidenavClose(){
    this.sidenavClose.emit();
  }

  onLogout(){
    this.onSidenavClose();
    this.authService.logout();
  }
}
