import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    public validationService: ValidationService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          ValidationService.passwordStrength(), // Keep this as synchronous validation
        ],
      ],
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.validationService.markAllAsTouched(this.loginForm);

    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {},
      error: (err) => {
        this.isLoading = false;

        if (err.error?.errors) {
          Object.keys(err.error.errors).forEach((key) => {
            const control = this.loginForm.get(key);
            if (control) {
              control.setErrors({
                serverError: err.error.errors[key].join(', '),
              });
            }
          });
        } else {
          this.loginForm.setErrors({
            serverError: err.error?.message || 'Login failed',
          });
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  hasError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (
      !!control && control.invalid && (control.touched || this.formSubmitted)
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
