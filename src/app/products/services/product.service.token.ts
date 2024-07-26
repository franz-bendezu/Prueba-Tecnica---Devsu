import { InjectionToken } from "@angular/core";
import { IProductService } from "./product.service.interface";

export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('PRODUCT_SERVICE_TOKEN');