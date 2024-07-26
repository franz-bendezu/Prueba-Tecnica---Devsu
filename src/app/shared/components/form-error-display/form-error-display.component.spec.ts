import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorDisplayComponent } from './form-error-display.component';
import { AbstractControl, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormErrorDisplayComponent', () => {
  let component: FormErrorDisplayComponent;
  let fixture: ComponentFixture<FormErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function setError(control: AbstractControl, errors: any): void {
    control.setErrors(errors);
    control.markAsDirty();
    control.markAsTouched();
    fixture.detectChanges();
  }

  it('when no errors, get errorKeys should return an empty array', () => {
    component.control = new FormControl('');
    setError(component.control, null);
    expect(component.errorKeys).toEqual([]);
  });

  it('should display error message when control is dirty or touched and has errors', () => {
    component.control = new FormControl('');
    setError(component.control, { required: { message: 'Field is required' } });
    const errorMessage = fixture.debugElement.query(
      By.css('.error-message')
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Field is required');
  });

  it('should not display error message when control is pristine and untouched, even if there are errors', () => {
    component.control = new FormControl('');
    component.control.setErrors({ required: { message: 'Field is required' } });
    fixture.detectChanges();
    const errorMessages = fixture.debugElement.queryAll(
      By.css('.error-message')
    );
    expect(errorMessages.length).toBe(0);
  });

  it('should not display error message when there are no errors', () => {
    component.control = new FormControl('');
    setError(component.control, null);
    const errorMessages = fixture.debugElement.queryAll(
      By.css('.error-message')
    );
    expect(errorMessages.length).toBe(0);
  });

  it('should display multiple error messages if control has multiple errors and is either dirty or touched', () => {
    component.control = new FormControl('');
    setError(component.control, {
      required: { message: 'Field is required' },
      pattern: { message: 'Invalid format' },
    });
    const errorMessages = fixture.debugElement.queryAll(
      By.css('.error-message')
    );
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].nativeElement.textContent).toContain(
      'Field is required'
    );
    expect(errorMessages[1].nativeElement.textContent).toContain(
      'Invalid format'
    );
  });
});
