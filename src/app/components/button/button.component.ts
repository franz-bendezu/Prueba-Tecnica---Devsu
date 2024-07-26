import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input()
  variant: 'primary' | 'secondary' = 'primary';

  @Input()
  disabled = false;

  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  loading = false;

  @Output()
  click = new EventEmitter<MouseEvent>();

  onClick($event: MouseEvent) {
    $event.stopPropagation();
    this.click.emit($event);
  }
}
