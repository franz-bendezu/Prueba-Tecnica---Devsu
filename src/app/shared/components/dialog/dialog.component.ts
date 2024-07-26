import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnChanges {
  @Input()
  open = false;
  @Output()
  openChange = new EventEmitter<boolean>();

  @ViewChild('dialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;

  private lastOpenState: boolean | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['open'] &&
      changes['open'].currentValue !== this.lastOpenState
    ) {
      this.toggleDialog(changes['open'].currentValue);
      this.lastOpenState = changes['open'].currentValue;
      this.cdr.markForCheck();
    }
  }

  show(): void {
    this.dialog.nativeElement.showModal();
  }

  close(): void {
    this.dialog.nativeElement.close();
  }

  private toggleDialog(isOpen: boolean): void {
    if (isOpen) {
      this.show();
    } else {
      this.close();
    }
  }

  handleClose() {
    this.open = false;
    this.openChange.emit(false);
    this.cdr.markForCheck();
  }
}
