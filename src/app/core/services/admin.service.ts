import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import {environment}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly apiUrl = 'http://localhost:3001/auth';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  updateUserBlockStatus(userId: string, isBlocked: boolean): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}/block`, { isBlocked });
  }
} 