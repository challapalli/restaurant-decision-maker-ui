import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-join',
  templateUrl: './session-join.component.html',
  styleUrls: ['./session-join.component.css']
})
export class SessionJoinComponent implements OnInit {

  errorMsg!: string;

  constructor(private sessionService: SessionService, 
    private route: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  joinSession(sessionId: string) {
    // Call the session service to join the session
    this.errorMsg = '';
    this.sessionService.joinSession(sessionId).subscribe(
      (response) => {
        console.log("Joined session successfully:", response);
        if(response) {
          // Redirect to session details page
          this.route.navigate(['/submit-restaurant', sessionId, response.username]);
        }
      },
      (error) => {
        console.error("Error joining session:", error);
        if(error.status === 401) {
          this.authService.logout();
          this.route.navigate(['/login']);
        } else if(error.status === 404) {
          this.errorMsg = "Session Id not found";
        }
      }
    );
  }

  back() {
    this.route.navigate(['/home']);
  }
}
