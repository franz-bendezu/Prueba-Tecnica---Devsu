import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent {
  @Input() products: IProduct[] = [];

  @Input()
  pageSizes = [5, 10, 25, 50, 100];
  pageSize = 10;

  changePageSize(size: number): void {
    this.pageSize = size;
  }
}
