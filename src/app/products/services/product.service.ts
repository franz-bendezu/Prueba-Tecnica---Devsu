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
  static PATH = '/products';
  url = environment.apiUrl + ProductService.PATH;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IProductsResponse>(this.url);
  }

  create(product: IProduct) {
    return this.http.post<IProductCreateResponse>(this.url, product);
  }

  getById(id: string) {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  update(product: IProduct) {
    return this.http.put<IProductUpdateResponse>(
      `${this.url}/${product.id}`,
      product
    );
  }

  deleteById(id: string) {
    return this.http.delete<IProductDeleteResponse>(`${this.url}/${id}`);
  }

  verificationById(id: string) {
    return this.http.get<boolean>(`${this.url}/verification/${id}`);
  }
}

export function provideProductService() {
  return {
    provide: PRODUCT_SERVICE_TOKEN,
    useClass: ProductService,
  };
}
