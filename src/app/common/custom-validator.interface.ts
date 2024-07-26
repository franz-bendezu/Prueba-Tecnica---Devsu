import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface CustomValidationErrors extends ValidationErrors {
  [key: string]: {
    message: string;
    [key: string]: any;
  };
}

export interface CustomValidatorFn extends ValidatorFn {
  (control: AbstractControl): CustomValidationErrors | null;
}
