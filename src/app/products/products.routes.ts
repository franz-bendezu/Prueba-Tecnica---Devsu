import { Routes } from '@angular/router';
import { PRODUCTS_PATH, PRODUCTS_ID_PATH } from '../shared/constants/routes.contants';
import { ProductEditComponent } from './views/product-edit/product-edit.component';
import { ProductsComponent } from './views/products/products.component';

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

