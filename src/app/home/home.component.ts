import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'lunch-decision-maker';

  constructor(private router: Router) {}  // Inject Router

  navigateToCreateSession() {
    this.router.navigate(['/create-session']);
  }

  navigateToJoinSession() {
    this.router.navigate(['/join-session']);
  }

}
