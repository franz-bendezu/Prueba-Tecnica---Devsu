import { Observable } from "rxjs";
import { IProduct } from "../interfaces/product.interface";
import { IProductsResponse, IProductCreateResponse, IProductUpdateResponse, IBaseResponse } from "../interfaces/products.interface";

export interface IProductService {
    getAll(): Observable<IProductsResponse>;
    create(product: IProduct): Observable<IProductCreateResponse>;
    getById(id: string): Observable<IProduct>;
    update(product: IProduct): Observable<IProductUpdateResponse>;
    deleteById(id: string): Observable<IBaseResponse>;
    verificationById(id: string): Observable<boolean>;
  }
  