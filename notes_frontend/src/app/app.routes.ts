import { Routes } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteEditorComponent } from './pages/note-editor/note-editor.component';

export const routes: Routes = [
  { path: '', component: NotesListComponent, title: 'Notes' },
  { path: 'notes/new', component: NoteEditorComponent, title: 'New Note' },
  { path: 'notes/:id', component: NoteEditorComponent, title: 'Edit Note' },
  { path: '**', redirectTo: '' }
];
