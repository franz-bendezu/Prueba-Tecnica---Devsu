import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductsComponent } from './products.component';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZoneChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        provideZoneChangeDetection({
          eventCoalescing: true,
        }),
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const products: IProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: '',
        date_release: '',
        date_revision: '',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: '',
        date_release: '',
        date_revision: '',
      },
    ];
    spyOn(productService, 'getAll').and.returnValue(of({ data: products }));

    fixture.detectChanges();

    expect(component.products).toEqual(products);
    expect(component.loading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('should handle error when loading products', () => {
    const error = new Error('Failed to load products');
    spyOn(productService, 'getAll').and.returnValue(throwError(() => error));

    fixture.detectChanges();

    expect(component.products).toEqual([]);
    expect(component.loading).toBe(false);
    expect(component.error).toBe(error);
  });

  it('should show table products', () => {
    const products: IProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: '',
        date_release: '',
        date_revision: '',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: '',
        date_release: '',
        date_revision: '',
      },
    ];
    spyOn(productService, 'getAll').and.returnValue(of({ data: products }));

    fixture.detectChanges();

    // Check if the table component is rendered and the products are passed to it
    const productTable = fixture.debugElement.query(By.css('app-product-table'));
    expect(productTable).toBeTruthy();
    expect(productTable.componentInstance.products).toEqual(component.products);
  });
});
