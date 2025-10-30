import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NotesService } from './services/notes.service';
import { ToastService } from './shared/notifications/toast.service';
@Component({
  selector: 'app-root',
  imports: [RouterModule, SidebarComponent, HeaderComponent],
  providers: [NotesService, ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
