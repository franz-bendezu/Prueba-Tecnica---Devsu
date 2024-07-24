import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { IProduct } from '../interfaces/product.interface';
import { IProductsReponse } from '../interfaces/products.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts: IProductsReponse = {
      data: [],
    };

    service.getAll().subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpTesting.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a product', () => {
    const mockProduct: IProduct = {
      id: 'new',
      name: 'Test',
      description: 'Test',
      logo: 'http://test.com',
      date_release: '2024-01-01T00:00:00.000Z',
      date_revision: '2024-01-01T00:00:00.000Z',
    };

    service.create(mockProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTesting.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({});
  });

  it('should retrieve a product by ID', () => {
    const mockProduct: IProduct = {
      id: 'created',
      name: 'Created Product',
      description: 'This is a created product',
      logo: 'http://test.com',
      date_release: '2024-01-01T00:00:00.000Z',
      date_revision: '2024-01-01T00:00:00.000Z',
    };
    const productId = '123';

    service.getById(productId).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpTesting.expectOne(`/api/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should update a product by ID', () => {
    const mockProduct: IProduct = {
      id: 'modified',
      name: 'Modified Product',
      description: 'This is a modified product',
      logo: 'http://test.com',
      date_release: '2024-01-01T00:00:00.000Z',
      date_revision: '2024-01-01T00:00:00.000Z',
    };
    const productId = '123';

    service.update(mockProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTesting.expectOne(`/api/products/${productId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({});
  });

  it('should delete a product by ID', () => {
    const productId = '123';

    service.deleteById(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTesting.expectOne(`/api/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toBeNull();
    req.flush({});
  });
});
