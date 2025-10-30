import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { CardComponent } from '../../shared/ui/card.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { ToastService } from '../../shared/notifications/toast.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
/** Note editor page for creating and updating notes. */
export class NoteEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notesService = inject(NotesService);
  private toast = inject(ToastService);

  noteId: string | null = null;
  model: { title: string; content: string } = { title: '', content: '' };
  loading = false;
  saving = false;

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId && this.noteId !== 'new') {
      this.loading = true;
      this.notesService.getNote(this.noteId).subscribe({
        next: (note: Note) => {
          this.model.title = note.title;
          this.model.content = note.content;
          this.loading = false;
        },
        error: () => {
          this.toast.error('Failed to load note');
          this.loading = false;
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.toast.error('Please fill in the required fields');
      return;
    }
    this.saving = true;
    if (this.noteId && this.noteId !== 'new') {
      this.notesService.updateNote(this.noteId, this.model).subscribe({
        next: (n) => {
          this.toast.success('Note updated');
          this.saving = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.toast.error('Update failed');
          this.saving = false;
        }
      });
    } else {
      this.notesService.createNote(this.model).subscribe({
        next: (n) => {
          this.toast.success('Note created');
          this.saving = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.toast.error('Create failed');
          this.saving = false;
        }
      });
    }
  }
}
