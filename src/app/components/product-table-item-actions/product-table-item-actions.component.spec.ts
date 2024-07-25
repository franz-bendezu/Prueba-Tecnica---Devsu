import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableItemActionsComponent } from './product-table-item-actions.component';

describe('ProductTableItemActionsComponent', () => {
  let component: ProductTableItemActionsComponent;
  let fixture: ComponentFixture<ProductTableItemActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableItemActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTableItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
