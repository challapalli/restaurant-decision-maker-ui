import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8080/api/restaurants';

  constructor(private http: HttpClient) { }

  getRestaurants(sessionId: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/${sessionId}`);
  }

  submitRestaurant(restaurantName: string, sessionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { name: restaurantName, sessionId: sessionId });
  }
}
