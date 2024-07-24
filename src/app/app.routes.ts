import { Routes } from '@angular/router';
import { ProductsComponent } from './views/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    title: 'Productos Financieros',
  },
];
