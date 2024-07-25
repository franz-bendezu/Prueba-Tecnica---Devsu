import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableComponent } from './product-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ProductTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    component.products = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        date_release: '2021-01-01',
        date_revision: '2021-01-02',
        logo: 'logo1.png',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        date_release: '2021-02-01',
        date_revision: '2021-02-02',
        logo: 'logo2.png',
      },
      {
        id: '3',
        name: 'Product 3',
        description: 'Description 3',
        date_release: '2021-03-01',
        date_revision: '2021-03-02',
        logo: 'logo3.png',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly calculate total pages', () => {
    component.pageSize = 1;
    component.calculateTotalPages();
    expect(component.totalPages).toBe(component.products.length);
  });

  it('should refresh displayed products when page size changes', () => {
    component.changePageSize(1);
    expect(component.items.length).toBe(1);
  });

  it('should navigate to the next page correctly', () => {
    component.pageSize = 1;
    component.changePage(2);
    expect(component.items[0]).toEqual(component.products[1]);
  });

});
