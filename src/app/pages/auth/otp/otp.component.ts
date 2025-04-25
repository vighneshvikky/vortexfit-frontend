import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as UserAction from '../../../store/user/user.actions';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  email: string = '';
  timer: number = 60;
  canResend: boolean = false;
  intervalRef: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private store: Store
  ) {
    const nav = this.router.getCurrentNavigation();
    console.log('nav', nav);
    const state = nav?.extras?.state as { email: string };
    this.email = state?.email || '';
  }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.startTimer();
  }

  startTimer(): void {
    this.timer = 60;
    this.canResend = false;
    this.intervalRef = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.canResend = true;
        clearInterval(this.intervalRef);
      }
    }, 1000);
  }

  verifyOtp(): void {
    if (this.otpForm.valid) {
      const otpData = {
        email: this.email,
        otp: this.otpForm.value.otp,
      };
console.log('verifying')
      this.authService.verifyOtp(otpData).subscribe({
        next: (res) => {
          console.log('res', res);
          this.store.dispatch(UserAction.setUser({user: res}));
          this.notification.success('OTP verified!.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.notification.error('Invalid OTP.');
        },
      });
    }
  }

  resendOtp(){
  this.authService.resendOtp({email: this.email}).subscribe({
    next: (res) => {
      console.log('res', res);
      this.notification.success('OTP resent!');
      this.startTimer();
    },
    error: (err) => {
    this.notification.error('Resend failed.');
    }
  })
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }
}
