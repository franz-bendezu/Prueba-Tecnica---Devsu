import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';

export interface CustomValidationErrors extends ValidationErrors {
  [key: string]: {
    message: string;
    [key: string]: any;
  };
}

export interface CustomValidatorFn extends ValidatorFn {
  (control: AbstractControl): CustomValidationErrors | null;
}

export interface CustomAsyncValidatorFn extends AsyncValidatorFn {
  (control: AbstractControl):
    | Promise<CustomValidationErrors | null>
    | Observable<CustomValidationErrors | null>;
}
