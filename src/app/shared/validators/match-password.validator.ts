import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export function MatchPassword(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = (formGroup as FormGroup).get(passwordKey);
    const confirmPassword = (formGroup as FormGroup).get(confirmPasswordKey);

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ notMatched: true });
      return { notMatched: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  };
}
