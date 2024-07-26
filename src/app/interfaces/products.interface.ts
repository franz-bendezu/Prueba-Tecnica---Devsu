import { IProduct } from "./product.interface";

export interface  IProductsResponse {
    data: IProduct[];
}

export interface IBaseResponse {
    message: string;
}

export interface IProductSaveResponse extends IBaseResponse {
    data: IProduct;
}

export interface IProductCreateResponse extends IProductSaveResponse {}

export interface IProductUpdateResponse extends IProductSaveResponse {}

export interface IProductDeleteResponse extends IBaseResponse {}