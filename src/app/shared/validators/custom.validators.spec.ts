import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import {
  required,
  minLength,
  maxLength,
} from './custom.validators';

describe('Custom Validators', () => {
  let control: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    control = new FormControl('');
  });

  describe('required', () => {
    it('should return null if the control has a value', () => {
      control.setValue('test');
      const validatorFn = required();
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return an error object if the control value is empty', () => {
      const validatorFn = required();
      const result = validatorFn(control);
      expect(result).toEqual({ required: { message: 'Este campo requerido' } });
    });

    it('should return a custom error message if provided', () => {
      const validatorFn = required('Custom message');
      const result = validatorFn(control);
      expect(result).toEqual({ required: { message: 'Custom message' } });
    });
  });

  describe('minLength', () => {
    it('should return null if the control value length is greater than or equal to the minimum length', () => {
      control.setValue('test');
      const validatorFn = minLength(3);
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return an error object if the control value length is less than the minimum length', () => {
      control.setValue('te');
      const validatorFn = minLength(3);
      const result = validatorFn(control);
      expect(result).toEqual({
        minLength: {
          requiredLength: 3,
          actualLength: 2,
          message: 'La longitud mínima es 3',
        },
      });
    });

    it('should return a custom error message if provided', () => {
      control.setValue('te');
      const validatorFn = minLength(3, 'Custom message');
      const result = validatorFn(control);
      expect(result).toEqual({
        minLength: {
          requiredLength: 3,
          actualLength: 2,
          message: 'Custom message',
        },
      });
    });
  });

  describe('maxLength', () => {
    it('should return null if the control value length is less than or equal to the maximum length', () => {
      control.setValue('test');
      const validatorFn = maxLength(5);
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return an error object if the control value length is greater than the maximum length', () => {
      control.setValue('test123');
      const validatorFn = maxLength(5);
      const result = validatorFn(control);
      expect(result).toEqual({
        maxLength: {
          requiredLength: 5,
          actualLength: 7,
          message: 'La longitud máxima es 5',
        },
      });
    });

    it('should return a custom error message if provided', () => {
      control.setValue('test123');
      const validatorFn = maxLength(5, 'Custom message');
      const result = validatorFn(control);
      expect(result).toEqual({
        maxLength: {
          requiredLength: 5,
          actualLength: 7,
          message: 'Custom message',
        },
      });
    });
  });
});