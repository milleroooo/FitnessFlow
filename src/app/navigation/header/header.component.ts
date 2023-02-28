import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 @Output() sidenavToggle = new EventEmitter<void>

 isAuth = false;
 authSubscription!: Subscription;

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSidenavToggle(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
