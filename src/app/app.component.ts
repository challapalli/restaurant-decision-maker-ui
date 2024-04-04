import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuth } from './model/restaurant';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUserSubscription: Subscription;
  currentUser!: UserAuth;
  constructor(private authService: AuthenticationService,
    private router: Router) { 
      this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    }
  
  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
}
}
