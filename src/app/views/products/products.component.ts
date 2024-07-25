import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { ProductTableComponent } from '../../components/product-table/product-table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;
  error: Error | null = null;
  constructor(private productService: ProductService) {}

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
}
