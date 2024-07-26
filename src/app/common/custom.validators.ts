import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomValidationErrors, CustomValidatorFn } from './custom-validator.interface';

export function required(message?: string): CustomValidatorFn {
  const originalValidator = Validators.required;
  return (control: AbstractControl): CustomValidationErrors | null => {
    const validationResult = originalValidator(control);
    if (validationResult && validationResult['required']) {
      return {
        required: {
          message: message || 'Este campo requerido',
        },
      };
    }
    return null;
  };
}

export function minLength(minLength: number, message?: string): CustomValidatorFn {
  const originalValidator = Validators.minLength(minLength);
  return (control: AbstractControl): CustomValidationErrors | null => {
    const validationResult = originalValidator(control);
    if (validationResult && validationResult['minlength']) {
      return {
        minLength: {
          requiredLength: validationResult['minlength'].requiredLength,
          actualLength: validationResult['minlength'].actualLength,
          message: message || `La longitud mínima es ${minLength}`,
        },
      };
    }
    return null;
  };
}

export function maxLength(maxLength: number, message?: string): ValidatorFn {
  const originalValidator = Validators.maxLength(maxLength);
  return (control: AbstractControl): CustomValidationErrors | null => {
    const validationResult = originalValidator(control);
    if (validationResult && validationResult['maxlength']) {
      return {
        maxLength: {
          requiredLength: validationResult['maxlength'].requiredLength,
          actualLength: validationResult['maxlength'].actualLength,
          message: message || `La longitud máxima es ${maxLength}`,
        },
      };
    }
    return null;
  };
}
