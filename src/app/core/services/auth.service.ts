import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ResendOtpRequest,
  SignupRequest,
  VerifyOtpRequest,
} from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth';
  constructor(private http: HttpClient) {}

  signup(data: SignupRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
  verifyOtp(data: VerifyOtpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, data);
  }

  resendOtp(data: ResendOtpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-otp`, data);
  }
}
