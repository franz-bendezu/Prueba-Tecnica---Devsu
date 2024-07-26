import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditFormComponent } from './product-edit-form.component';
import { FormErrorDisplayComponent } from '../form-error-display/form-error-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideZoneChangeDetection } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { By } from '@angular/platform-browser';

describe('ProductEditFormComponent', () => {
  let component: ProductEditFormComponent;
  let fixture: ComponentFixture<ProductEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormErrorDisplayComponent,
        ProductEditFormComponent,
        ButtonComponent 
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit event on form submission', () => {
    spyOn(component.save, 'emit');
    component.onSubmitForm();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should reset form on reset button click', () => {
    spyOn(component.productForm, 'reset');
    component.onResetForm();
    expect(component.productForm.reset).toHaveBeenCalled();
  });

  it('should initialize the form with default values', () => {
    expect(component.productForm.value).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
  });

  it('should disable the submit button when the form is invalid', () => {
    component.productForm.setValue({
      id: 'abcd',
      name: 'Test Product',
      description: 'Lorem ipsum',
      logo: 'logo.png',
      date_release: new Date().toISOString(),
      date_revision: new Date().toISOString(),
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(submitButton.disabled).toBe(false);

    component.productForm.get('name')?.setValue('');
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
  });

  it('should call onSubmitForm method when the form is submitted', () => {
    component.productForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'Lorem ipsum',
      logo: 'logo.png',
      date_release: new Date().toISOString(),
      date_revision: new Date().toISOString(),
    });
    fixture.detectChanges();
    spyOn(component, 'onSubmitForm');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onSubmitForm).toHaveBeenCalled();
  });

  it('should call onResetForm method when the form is reset', () => {
    spyOn(component, 'onResetForm');
    const resetButton:ButtonComponent = fixture.debugElement.query(
     By.css('app-button[type="reset"]')
    ).componentInstance 
    
    resetButton.click.emit();
    
    fixture.detectChanges();

    expect(component.onResetForm).toHaveBeenCalled();
  });

  it('should be disable id if product is defined', () => {
    component.product = {
      id: '1234',
      name: 'Test Product',
      description: 'Lorem ipsum',
      logo: 'logo.png',
      date_release: new Date().toISOString(),
      date_revision: new Date().toISOString(),
    };
    component.updateForm();
    fixture.detectChanges();
    const idInput = fixture.nativeElement.querySelector('#id');
    expect(idInput.disabled).toBe(true);
  });
});
