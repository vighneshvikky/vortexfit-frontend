import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

interface UserResponse {
  success: boolean;
  users: any[];
  trainers: any[];
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  readonly apiUrl = 'http://localhost:3001/auth'
  private users: any[] = [];
  private trainers: any[] = [];
  constructor(private http: HttpClient, private router: Router){}
  
  setUsers() {
     this.http.get<UserResponse>(`${this.apiUrl}/users`, {withCredentials: true}).subscribe({
      next: (response) => {
        this.users = response.users;
        this.trainers = response.trainers;
        console.log('response.trainers', response.trainers)
        console.log('response.users', response.users)
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
     })
  }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users`, { withCredentials: true });
  }

  updateUserStatus(userId: string, isBlocked: boolean, role: string){
    console.log('userId', userId)
    console.log('isBlocked', isBlocked)
    console.log('role', role)
    return this.http.patch(`${this.apiUrl}/${userId}/status/${role}`, {isBlocked})
  }
  
}
