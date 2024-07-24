import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { IProductsReponse } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = '/api/products';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IProductsReponse>(this.url);
  }

  create(product: IProduct) {
    return this.http.post(this.url, product);
  }

  getById(id: string) {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  update(product: IProduct) {
    return this.http.put(`${this.url}/${product.id}`, product);
  }

  deleteById(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
