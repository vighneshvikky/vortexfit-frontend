import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AdminService {
  readonly apiUrl = 'http://localhost:3001/auth'
  private users: any[] = [];
  constructor(private http: HttpClient, private router: Router){}
  setUsers() {
     this.http.get<{users: any[]}>(`${this.apiUrl}/users`, {withCredentials: true}).subscribe({
      next: (response) => {
        this.users = response.users;
        console.log('response.users', response.users)
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
     })
  }

  getUsers(): Observable<any[]> {
    return this.http.get<{ users: any[] }>(`${this.apiUrl}/users`, { withCredentials: true }).pipe(
      map(response => response.users)
    );
  }

  updateUserStatus(userId: string, isBlocked: boolean){
    return this.http.patch(`${this.apiUrl}/${userId}/status`, {isBlocked})
  }
  
}
