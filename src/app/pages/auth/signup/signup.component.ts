import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../../../shared/validators/match-password.validator';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  role: 'user' | 'trainer' = 'user';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: [this.role],
      },
      { validators: MatchPassword('password', 'confirmPassword') }
    );
  }

  setRole(role: 'user' | 'trainer') {
    this.role = role;
    this.signupForm.patchValue({ role });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.authService.signup(formData).subscribe({
        next: (response) => {
          this.notificationService.success('Signup successfull!.');
          this.router.navigate(['/verifyOtp'], {
            state: { email: response.email },
          });
        },
        error: (error) => {
          this.notificationService.error('Signup Failed. Try again!');
          console.log('Signup error:', error);
        },
      });
    }
  }
}
