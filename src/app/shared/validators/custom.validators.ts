import { Validators } from '@angular/forms';
import {
  CustomAsyncValidatorFn,
  CustomValidationErrors,
  CustomValidatorFn,
} from '../interfaces/custom-validator.interface';
import { Observable, map, catchError, of } from 'rxjs';

export function required(message?: string): CustomValidatorFn {
  const originalValidator = Validators.required;
  return (control): CustomValidationErrors | null => {
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

export function minLength(
  minLength: number,
  message?: string
): CustomValidatorFn {
  const originalValidator = Validators.minLength(minLength);
  return (control): CustomValidationErrors | null => {
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

export function maxLength(
  maxLength: number,
  message?: string
): CustomValidatorFn {
  const originalValidator = Validators.maxLength(maxLength);
  return (control) => {
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

export function minDate(minDate: Date, message?: string): CustomValidatorFn {
  return (control) => {
    const date = new Date(control.value);
    if (date < minDate) {
      return {
        minDate: {
          message: message || `La fecha mínima es ${minDate}`,
        },
      };
    }
    return null;
  };
}

export type CodeValidator = (code: string) => Observable<boolean>;

export function codeExists(
  verification: CodeValidator,
  notExistsMessage: string,
  errorMessage: string
): CustomAsyncValidatorFn {
  return (control) => {
    return verification(control.value).pipe(
      map((exists) =>
        !exists
          ? null
          : {
              codeNotExists: {
                message: notExistsMessage,
              },
            }
      ),
      catchError(() => of({ codeNotExists: { message: errorMessage } }))
    );
  };
}
