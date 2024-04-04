import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session, UserAuth } from '../model/restaurant';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css']
})
export class SessionCreateComponent implements OnInit {

  sessionId!: number;
  sessionCreated: boolean = false;

  constructor(private sessionService: SessionService, 
    private route: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createSession() {
    // Call the session service to create a new session
    const user: UserAuth = JSON.parse(localStorage.getItem("currentUser")!);
    this.sessionService.createSession(user.username).subscribe(
      (response) => {
        console.log("Session created successfully:", response);
        // Redirect to session details page
        //this.route.navigate(['/join-session']);
        this.sessionId = response.id;
        console.log(this.sessionId);
        
        this.sessionCreated = true;
      },
      (error) => {
        console.error("Error creating session:", error);
        if(error.status === 401) {
          this.authService.logout();
          this.route.navigate(['/login']);
        }
      }
    );
  }

  back() {
    this.route.navigate(['/home']);
  }
}
