import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, InputComponent, ButtonComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
/** Header with search and primary action button. */
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  query = '';

  onSearchChange(value: string) {
    this.query = value || '';
    this.search.emit(this.query);
  }
}
