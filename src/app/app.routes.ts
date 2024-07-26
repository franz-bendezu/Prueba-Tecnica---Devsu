import { Routes } from '@angular/router';
import { ProductsComponent } from './views/products/products.component';
import { ProductEditComponent } from './views/product-edit/product-edit.component';
import { PRODUCTS_PATH, PRODUCTS_ID_PATH } from './constants/routes.contants';

export const routes: Routes = [
  { path: '', redirectTo: PRODUCTS_PATH, pathMatch: 'full' },
  {
    path: PRODUCTS_PATH,
    component: ProductsComponent,
    title: 'Productos Financieros',
  },
  {
    path: PRODUCTS_ID_PATH,
    component: ProductEditComponent,
    title: 'Editar Producto',
  },
];
