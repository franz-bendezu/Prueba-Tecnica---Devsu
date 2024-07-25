import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DotsIcon } from '../icons/dots.icon';
import { PencilIcon } from '../icons/pencil.icon';
import { TrashIcon } from '../icons/trash.icon';

@Component({
  selector: 'app-product-table-item-actions',
  standalone: true,
  imports: [DotsIcon, TrashIcon, PencilIcon],
  templateUrl: './product-table-item-actions.component.html',
  styleUrl: './product-table-item-actions.component.css',
})
export class ProductTableItemActionsComponent {
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  showMenu = false;

  openMenu() {
    this.showMenu = !this.showMenu;
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  @ViewChild('moreButton') toggleButton?: ElementRef;
  @ViewChild('moreMenu') menu?: ElementRef;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton?.nativeElement &&
        e.target !== this.menu?.nativeElement
      ) {
        this.showMenu = false;
      }
    });
  }
}
