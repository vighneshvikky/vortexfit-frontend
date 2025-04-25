import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {    
//   getErrorMessage(control: AbstractControl | null): string {
//     if (!control || !control.errors) return '';

//     const errors = control.errors as ValidationErrors;

//     if (errors['required']) {
//       return 'This field is required';
//     }
//     if (errors['email']) {
//       return 'Please enter a valid email address';
//     }
//     if (errors['minlength']) {
//       return `Minimum length is ${errors['minlength'].requiredLength} characters`;
//     }
//     if (errors['serverError']) {
//       return errors['serverError'];
//     }
    

//     return 'Invalid value';
//   }

static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
  
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*]/.test(value);
  
      const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      return valid ? null : {
        passwordStrength: {
          message: 'Password must include uppercase, lowercase, number, and special character.'
        }
      };
    };
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors) return '';
    const errors = control.errors;
    if (errors['required']) return 'This field is required.';
    if (errors['email']) return 'Enter a valid email address.';
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}.`;
    if (errors['passwordStrength']) return errors['passwordStrength'].message;
    if (errors['serverError']) return errors['serverError'];
    return 'Invalid input.';
  }

  markAllAsTouched(group: FormGroup) {
    Object.values(group.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markAllAsTouched(control as FormGroup);
      }
    });
  }
}