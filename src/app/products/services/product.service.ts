import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import {
  IProductCreateResponse,
  IProductDeleteResponse,
  IProductsResponse,
  IProductUpdateResponse,
} from '../interfaces/products.interface';
import { IProductService } from './product.service.interface';
import { PRODUCT_SERVICE_TOKEN } from './product.service.token';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService implements IProductService {
  static PRODUCTS_PATH = '/products';
  static PRODUCT_URL = environment.apiUrl + ProductService.PRODUCTS_PATH;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IProductsResponse>(ProductService.PRODUCT_URL);
  }

  create(product: IProduct) {
    return this.http.post<IProductCreateResponse>(
      ProductService.PRODUCT_URL,
      product
    );
  }

  getById(id: string) {
    return this.http.get<IProduct>(`${ProductService.PRODUCT_URL}/${id}`);
  }

  update(product: IProduct) {
    return this.http.put<IProductUpdateResponse>(
      `${ProductService.PRODUCT_URL}/${product.id}`,
      product
    );
  }

  deleteById(id: string) {
    return this.http.delete<IProductDeleteResponse>(
      `${ProductService.PRODUCT_URL}/${id}`
    );
  }

  verificationById(id: string) {
    return this.http.get<boolean>(
      `${ProductService.PRODUCT_URL}/verification/${id}`
    );
  }
}

export function provideProductService() {
  return {
    provide: PRODUCT_SERVICE_TOKEN,
    useClass: ProductService,
  };
}
