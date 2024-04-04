import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/restaurant';

@Injectable({ providedIn: 'root' })
export class UserService {

    private apiUrl = 'http://localhost:8080/api';
    constructor(private http: HttpClient) { }

    register(user: UserLogin) {
        return this.http.post(`${this.apiUrl}/register`, user);
    }
}