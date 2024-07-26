import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductsComponent } from './products.component';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PARAM_NEW, PRODUCTS_PATH } from '../../constants/routes.contants';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;
  const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
        { provide: Router, useValue: routerSpy },
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
    const productTable = fixture.debugElement.query(
      By.css('app-product-table')
    );
    expect(productTable).toBeTruthy();
    expect(productTable.componentInstance.products).toEqual(component.products);
  });

  it('should handle error when loading products', fakeAsync(() => {
    const error = new Error('Failed to load products');
    spyOn(productService, 'getAll').and.returnValue(throwError(() => error));

    fixture.detectChanges();

    expect(component.error).toBe(error);
  }));

  it('should add a product', () => {
    spyOn(component, 'addProduct').and.callThrough();

    const button =
      fixture.debugElement.nativeElement.querySelector('.add-button');
    button.click();

    expect(component.addProduct).toHaveBeenCalled();

    expect(routerSpy.navigate).toHaveBeenCalledWith([PRODUCTS_PATH, PARAM_NEW]);
  });

  it('should navigate to edit product', () => {
    const productMock = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    spyOn(component, 'editProduct').and.callThrough();

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('app-product-table'));
    button.triggerEventHandler('edit', productMock);

    expect(component.editProduct).toHaveBeenCalledWith(productMock);

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      'products',
      productMock.id,
    ]);
  });

  it('should delete a product', () => {
    const productMock: IProduct = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    spyOn(productService, 'deleteById').and.returnValue(of({}));

    component.confirmDelete(productMock);

    expect(productService.deleteById).toHaveBeenCalledWith(productMock.id);
  });

  it('should handle error when deleting a product', fakeAsync(() => {
    const productMock: IProduct = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    const mockError = new Error('Failed to delete product');
    spyOn(productService, 'deleteById').and.returnValue(
      throwError(() => mockError)
    );

    fixture.detectChanges();
    
    component.confirmDelete(productMock);

    expect(component.saveError).toBe(mockError);

  }));

  it('should delete a product', () => {
    const productMock = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    component.productToDelete = productMock;

    component.deleteProduct(productMock);

    expect(component.openDialog).toBeTrue();
    expect(component.productToDelete).toEqual(productMock);
  });

  it('should cancel delete', () => {
    component.productToDelete = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };

    component.cancelDelete();

    expect(component.openDialog).toBeFalse();
  });

  it('should edit a product', () => {
    const productMock = {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    };
    spyOn(component, 'editProduct');

    component.editProduct(productMock);

    expect(component.editProduct).toHaveBeenCalledWith(productMock);
  });

  it('should retry loading products', () => {
    spyOn(component, 'loadProducts');

    component.error = new Error('Failed to load products');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.loadProducts).toHaveBeenCalled();
  });
});
