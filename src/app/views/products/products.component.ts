import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductConfirmDeleteDialogComponent } from '../../components/product-confirm-delete-dialog/product-confirm-delete-dialog.component';
import { ButtonComponent } from '../../components/button/button.component';
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

  search = '';

  openDialog = false;

  productToDelete: IProduct | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
      next: (products) => {
        this.products = products.data;
      },
    });
  }

  async ngOnInit() {
    this.loadProducts();
  }

  addProduct() {
    this.router.navigate(['products', 'new']);
  }

  editProduct(product: IProduct) {
    this.router.navigate(['products', product.id]);
  }

  deleteProduct(product: IProduct) {
    this.openDialog = true;
    this.productToDelete = product;
  }

  confirmDelete(product: IProduct) {
    this.openDialog = false;
    this.productService.deleteById(product.id).subscribe({
      complete: () => {
        this.loadProducts();
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  cancelDelete() {
    this.openDialog = false;
  }
}
