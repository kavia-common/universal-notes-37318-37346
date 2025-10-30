import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
/** Sidebar navigation for the notes app. */
export class SidebarComponent {
  year = new Date().getFullYear();
}
