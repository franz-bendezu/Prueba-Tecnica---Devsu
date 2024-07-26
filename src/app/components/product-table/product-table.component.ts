import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { ProductTableItemActionsComponent } from '../product-table-item-actions/product-table-item-actions.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductTableItemActionsComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent implements OnChanges {
  @Input()
  products: IProduct[] = [];
  @Input()
  pageSizes = [5, 10, 25, 50, 100];
  @Input()
  pageSize = 10;
  @Input()
  currentPage = 1;
  @Output()
  edit = new EventEmitter<IProduct>();
  @Output()
  delete = new EventEmitter<IProduct>();

  @Input()
  loading = false;

  items: IProduct[] = [];
  totalPages = 0;

  changePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.refreshDisplayedProducts();
    this.calculateTotalPages();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.refreshDisplayedProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] || changes['pageSize'] || changes['currentPage']) {
      this.refreshDisplayedProducts();
    }
    if (changes['products'] || changes['pageSize']) {
      this.calculateTotalPages();
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
  }

  refreshDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.items = this.products.slice(startIndex, endIndex);
  }

  onEdit(product: IProduct): void {
    this.edit.emit(product);
  }

  onDelete(product: IProduct): void {
    this.delete.emit(product);
  }
}
