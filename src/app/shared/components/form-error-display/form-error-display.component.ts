import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error-display.component.html',
  styleUrl: './form-error-display.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorDisplayComponent {
  @Input({
    required: true,
  })
  control!: AbstractControl;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.control.events.subscribe(() => {
      this.cdr.markForCheck(); 
    });
  }

  getErrorKeys(): string[] {
    return Object.keys(this.control.errors || {});
  }
}
