import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductTableComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;
  error: Error | null = null;

  search = '';

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
   alert('Are you sure you want to delete this product?');
  }
}
