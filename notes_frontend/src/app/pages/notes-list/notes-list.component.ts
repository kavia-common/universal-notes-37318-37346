import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { CardComponent } from '../../shared/ui/card.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { ToastService } from '../../shared/notifications/toast.service';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, ButtonComponent, FormsModule, DatePipe],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
/** Displays notes with search and CRUD actions. */
export class NotesListComponent implements OnInit {
  private notesService = inject(NotesService);
  private toast = inject(ToastService);

  notes: Note[] = [];
  filtered: Note[] = [];
  loading = false;
  query = '';

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.notesService.listNotes().subscribe({
      next: (data) => {
        this.notes = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.toast.error('Failed to load notes');
        this.loading = false;
      }
    });
  }

  applyFilter() {
    const q = this.query.trim().toLowerCase();
    this.filtered = !q
      ? this.notes
      : this.notes.filter(n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
        );
  }

  onDelete(note: Note) {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const canDelete = typeof g.confirm === 'function'
      ? g.confirm(`Delete note "${note.title}"?`)
      : true;
    if (!canDelete) return;
    this.notesService.deleteNote(note.id).subscribe({
      next: () => {
        this.toast.success('Note deleted');
        this.fetch();
      },
      error: (e) => {
        console.error(e);
        this.toast.error('Delete failed');
      }
    });
  }
}
