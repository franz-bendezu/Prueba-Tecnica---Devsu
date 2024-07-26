import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableItemActionsComponent } from './product-table-item-actions.component';

describe('ProductTableItemActionsComponent', () => {
  let component: ProductTableItemActionsComponent;
  let fixture: ComponentFixture<ProductTableItemActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableItemActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when onEdit is called', () => {
    spyOn(component.edit, 'emit');
    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('should emit delete event when onDelete is called', () => {
    spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should toggle showMenu when openMenu is called', () => {
    component.showMenu = false;
    component.openMenu();
    expect(component.showMenu).toBe(true);
    component.openMenu();
    expect(component.showMenu).toBe(false);
  });
});
