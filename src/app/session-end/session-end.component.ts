import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session-end',
  templateUrl: './session-end.component.html',
  styleUrls: ['./session-end.component.css']
})
export class SessionEndComponent implements OnInit {
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  endSession(sessionId: string) {
    // Call the session service to end the session
    this.sessionService.endSession(parseInt(sessionId))
    .subscribe((response) => {
        console.log("Session ended successfully:", response);
        // Redirect to session details page
      },
      (error) => {
        console.error("Error ending session:", error);
      }
    );
  }
}
