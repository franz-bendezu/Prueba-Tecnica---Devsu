import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { IProduct } from '../interfaces/product.interface';
import { IProductsResponse } from '../interfaces/products.interface';
import { IProductService } from './product.service.interface';
import { PRODUCT_SERVICE_TOKEN } from './product.service.token';
import { ProductService, provideProductService } from './product.service';

describe('ProductService', () => {
  let service: IProductService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideProductService(),
      ],
    });
    service = TestBed.inject(PRODUCT_SERVICE_TOKEN);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts: IProductsResponse = {
      data: [],
    };

    service.getAll().subscribe((response) => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpTesting.expectOne(ProductService.PRODUCT_URL);
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

    const req = httpTesting.expectOne(ProductService.PRODUCT_URL);
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

    const req = httpTesting.expectOne(
      `${ProductService.PRODUCT_URL}/${productId}`
    );
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

    service.update(mockProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTesting.expectOne(`${ProductService.PRODUCT_URL}/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({});
  });

  it('should delete a product by ID', () => {
    const productId = 'toBeDeleted';

    service.deleteById(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTesting.expectOne(`${ProductService.PRODUCT_URL}/${productId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toBeNull();
    req.flush({});
  });

  it('should verify if a product exists by ID', () => {
    const productId = 'exists';

    service.verificationById(productId).subscribe((response) => {
      expect(response).toBeTrue();
    });

    const req = httpTesting.expectOne(
      `${ProductService.PRODUCT_URL}/verification/${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });
});
