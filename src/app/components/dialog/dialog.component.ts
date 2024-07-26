import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnChanges {
  @Input()
  open = false;
  @Output()
  openChange = new EventEmitter<boolean>();

  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

  private lastOpenState: boolean | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && changes['open'].currentValue !== this.lastOpenState) {
      this.toggleDialog(changes['open'].currentValue);
      this.lastOpenState = changes['open'].currentValue;
    }
  }

  private toggleDialog(isOpen: boolean): void {
    if (isOpen) {
      this.dialog.nativeElement.showModal();
    } else {
      this.dialog.nativeElement.close();
    }
  }

  handleClose() {
    this.open = false;
    this.openChange.emit(false);
  }
}
