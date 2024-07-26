import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfirmDeleteDialogComponent } from './product-confirm-delete-dialog.component';
import { IProduct } from '../../interfaces/product.interface';

describe('ProductConfirmDeleteDialogComponent', () => {
  let component: ProductConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ProductConfirmDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductConfirmDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.open).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.product).toBeUndefined();
  });

  it('should set input properties correctly', () => {
    const product = {
      name: 'Test Product',
    };
    component.open = true;
    component.loading = true;
    component.product = product;
    fixture.detectChanges();

    expect(component.open).toBe(true);
    expect(component.loading).toBe(true);
    expect(component.product).toBe(product);
  });

  it('should emit reject event on handleReject', () => {
    spyOn(component.reject, 'emit');
    component.handleReject();
    expect(component.reject.emit).toHaveBeenCalled();
  });

  it('should emit confirm event on handleConfirm', () => {
    spyOn(component.confirm, 'emit');
    component.handleConfirm();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit openChange event when open property changes', () => {
    spyOn(component.openChange, 'emit');
    component.open = true;
    fixture.detectChanges();
    component.openChange.emit(component.open);
    expect(component.openChange.emit).toHaveBeenCalledWith(true);
  });
});
