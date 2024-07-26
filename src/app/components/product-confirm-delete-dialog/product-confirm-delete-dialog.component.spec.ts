import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfirmDeleteDialogComponent } from './product-confirm-delete-dialog.component';

describe('ProductConfirmDeleteDialogComponent', () => {
  let component: ProductConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ProductConfirmDeleteDialogComponent>;
  const product = {
    name: 'Test Product',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductConfirmDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    component.open = true;
    component.loading = true;
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input properties correctly', () => {
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
