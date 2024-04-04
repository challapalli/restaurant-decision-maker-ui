import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:8080/api/sessions';

  constructor(private http: HttpClient) { }

  createSession(createdBy: string): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrl}`, { 'createdBy': createdBy});
  }

  joinSession(sessionId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${sessionId}/join`, {});
  }

  endSession(sessionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${sessionId}/end`, {});
  }
}
