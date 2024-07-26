import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input()
  variant: 'primary' | 'secondary' = 'primary';

  @Input()
  disabled = false;

  @Input()
  type: 'button' | 'submit' = 'button';

  @Output()
  click = new EventEmitter<MouseEvent>();

  onClick($event: MouseEvent) {
    this.click.emit($event);
  }
}
