import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input()
  open = false;
  @Input({
    required: true,
  })
  title: string = '';
  @Input({
    required: true,
  })
  message: string = '';

  @Output() 
  openChange = new EventEmitter<boolean>();

  @Output() close = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  handleChangeOpen(open: boolean) {
    this.open = open;
    this.openChange.emit(open);
    this.cdr.markForCheck();
  }

  closeAlert() {
    this.handleChangeOpen(false);
    this.close.emit();
  }
}
