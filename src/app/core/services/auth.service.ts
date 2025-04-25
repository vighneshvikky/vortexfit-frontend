import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../../pages/auth/interface/auth.interface';
import {
  ResendOtpRequest,
  SignupRequest,
  VerifyOtpRequest,
} from '../../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = 'http://localhost:3001/auth';
  constructor(private http: HttpClient, private router: Router) {}
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
  verifyOtp(data: VerifyOtpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, data);
  }

  resendOtp(data: ResendOtpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-otp`, data);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          console.log('response =>', response)
          this.isAuthenticatedSubject.next(true);
          if (response.user.role === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else if (response.user.role === 'trainer') {
            this.router.navigate(['/trainer-dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        })
      );
  }

  refreshAccessToken() {
    console.log('Refreshing token...');
    return this.http.post(`${this.apiUrl}/validateRefreshToken`, {}, {withCredentials: true});
  }

    
    getAccessToken(): string | null {
      const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
      return match ? match[2] : null;
    }
  

  // logout(): void {
  //   this.http.post('/api/auth/logout', {}).subscribe(() => {
  //     this.isAuthenticatedSubject.next(false);
  //     this.router.navigate(['/login']);
  //   });
  // }'



  logout(): void {
    // Clear tokens and redirect to login
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
