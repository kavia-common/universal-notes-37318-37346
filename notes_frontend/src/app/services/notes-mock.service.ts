import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { Note } from '../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NotesMockService
 * In-memory CRUD implementation used when no API base URL is configured.
 * Data is persisted in sessionStorage for the duration of the session.
 */
@Injectable({ providedIn: 'root' })
export class NotesMockService {
  private storageKey = 'notes-mock-storage';

  private load(): Note[] {
    try {
      const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
      if (!g.sessionStorage) return [];
      const raw = g.sessionStorage.getItem(this.storageKey);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private save(notes: Note[]) {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    if (!g.sessionStorage) return;
    g.sessionStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  private uid(): string {
    return Math.random().toString(36).slice(2, 10);
  }

  // PUBLIC_INTERFACE
  listNotes(): Observable<Note[]> {
    return of(this.load()).pipe(delay(100));
  }

  // PUBLIC_INTERFACE
  getNote(id: string): Observable<Note> {
    const note = this.load().find(n => n.id === id);
    if (!note) {
      return throwError(() => new Error('Note not found'));
    }
    return of(note).pipe(delay(80));
  }

  // PUBLIC_INTERFACE
  createNote(payload: Pick<Note, 'title' | 'content'>): Observable<Note> {
    const notes = this.load();
    const now = new Date().toISOString();
    const note: Note = {
      id: this.uid(),
      title: payload.title,
      content: payload.content,
      createdAt: now,
      updatedAt: now,
    };
    notes.unshift(note);
    this.save(notes);
    return of(note).pipe(delay(120));
  }

  // PUBLIC_INTERFACE
  updateNote(id: string, payload: Partial<Pick<Note, 'title' | 'content'>>): Observable<Note> {
    const notes = this.load();
    const idx = notes.findIndex(n => n.id === id);
    if (idx < 0) return throwError(() => new Error('Note not found'));
    const updated: Note = { ...notes[idx], ...payload, updatedAt: new Date().toISOString() };
    notes[idx] = updated;
    this.save(notes);
    return of(updated).pipe(delay(120));
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): Observable<{ success: boolean }> {
    const notes = this.load().filter(n => n.id !== id);
    this.save(notes);
    return of({ success: true }).pipe(delay(80));
  }
}
