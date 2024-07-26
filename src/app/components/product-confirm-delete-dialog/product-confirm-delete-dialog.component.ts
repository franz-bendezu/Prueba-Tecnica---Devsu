import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-product-confirm-delete-dialog',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  templateUrl: './product-confirm-delete-dialog.component.html',
  styleUrl: './product-confirm-delete-dialog.component.css',
})
export class ProductConfirmDeleteDialogComponent {
  @Input()
  open = false;
  @Output()
  reject = new EventEmitter<void>();

  @Input()
  loading = false;
  @Input({ required: true })
  product!: Pick<IProduct, 'name'>;
  @Output()
  openChange = new EventEmitter<boolean>();
  @Output()
  confirm = new EventEmitter<void>();

  handleReject() {
    this.reject.emit();
  }

  handleConfirm() {
    this.confirm.emit();
  }
}
