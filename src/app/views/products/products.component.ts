import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductConfirmDeleteDialogComponent } from '../../components/product-confirm-delete-dialog/product-confirm-delete-dialog.component';
import { ButtonComponent } from '../../components/button/button.component';
import { PARAM_NEW, PRODUCTS_PATH } from '../../constants/routes.contants';
import { IProductsReponse } from '../../interfaces/products.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductTableComponent,
    FormsModule,
    ProductConfirmDeleteDialogComponent,
    ButtonComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;
  error: Error | null = null;
  saveError: Error | null = null;

  search = '';

  openDialog = false;

  productToDelete: IProduct | null = null;
  loadingDelete = false;

  constructor(private productService: ProductService, private router: Router) {}

  loadProducts() {
    this.loading = true;
    this.error = null;
    this.productService.getAll().subscribe({
      next: (response: IProductsReponse) => {
        this.products = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }

  async ngOnInit() {
    this.loadProducts();
  }

  addProduct() {
    this.router.navigate([PRODUCTS_PATH, PARAM_NEW]);
  }

  editProduct(product: IProduct) {
    this.router.navigate([PRODUCTS_PATH, product.id]);
  }

  deleteProduct(product: IProduct) {
    this.openDialog = true;
    this.productToDelete = product;
  }

  confirmDelete(product: IProduct) {
    this.loadingDelete = true;
    this.saveError = null;
    this.productService.deleteById(product.id).subscribe({
      next: () => {
        this.loadProducts();
        this.openDialog = false;
      },
      error: (err) => {
        this.saveError = err;
        this.loadingDelete = false;
      },
    });
  }

  cancelDelete() {
    this.openDialog = false;
  }
}
