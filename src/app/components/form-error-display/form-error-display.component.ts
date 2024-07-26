import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error-display.component.html',
  styleUrl: './form-error-display.component.css',
})
export class FormErrorDisplayComponent {
  @Input({
    required: true,
  })
  control!: AbstractControl;

  get errorKeys(): string[] {
    return Object.keys(this.control.errors || {});
  }
}
