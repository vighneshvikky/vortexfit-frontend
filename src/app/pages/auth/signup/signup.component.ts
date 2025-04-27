import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../../../shared/validators/match-password.validator';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  role: 'user' | 'trainer' = 'user';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
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

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${this.capitalizeFirstLetter(controlName)} is required`;
    }
    
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${this.capitalizeFirstLetter(controlName)} must be at least ${minLength} characters`;
    }
    
    return '';
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSubmit(): void {
    if (this.signupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData = this.signupForm.value;
      
      this.authService.signup(formData).subscribe({
        next: (response) => {
          this.notificationService.success('Signup successful!');
          this.router.navigate(['/verifyOtp'], {
            state: { email: response.email },
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          this.notificationService.error('Signup Failed. Try again!');
          console.log('Signup error:', error);
        },
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
