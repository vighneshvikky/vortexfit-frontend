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
// import { SignupService } from '../services/signup.service'; // your API service

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  role: 'user' | 'trainer' = 'user'; // default

  constructor(
    private fb: FormBuilder,
    private router: Router ,
    private notificationService: NotificationService
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

  // When user clicks on User/Trainer button
  setRole(role: 'user' | 'trainer') {
    this.role = role;
    this.signupForm.patchValue({ role });

    // Optional: Clear or reset trainer-specific fields
    if (role === 'user') {
      this.signupForm.get('experience')?.reset();
    }
  }

  onSubmit(): void {
    console.log('hai');
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.notificationService.success('Signup successful!');
      console.log('formData', formData);
      this.signupForm.markAllAsTouched();
      return;
    }

    const formData = this.signupForm.value;

    // this.signupService.register(formData).subscribe({
    //   next: (res) => {
    //     // Success: Redirect based on role
    //     if (this.role === 'trainer') {
    //       this.router.navigate(['/trainer-dashboard']);
    //     } else {
    //       this.router.navigate(['/user-dashboard']);
    //     }
    //   },
    //   error: (err) => {
    //     // Show some alert/toast based on error
    //     console.error('Signup failed:', err);
    //   }
    // });
  }
}
