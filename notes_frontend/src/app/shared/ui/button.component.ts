import { Component, EventEmitter, Input, Output } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
/** Reusable button with variants: primary, danger, ghost. */
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() kind: 'primary' | 'danger' | 'ghost' = 'primary';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<any>();

  onClick(e: any) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.clicked.emit(e);
  }
}
