import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable, of } from 'rxjs';
import { NotesMockService } from './notes-mock.service';

/**
 * PUBLIC_INTERFACE
 * NotesService
 * Provides CRUD operations for notes. It reads the base URL from environment variables:
 * NG_APP_API_BASE or NG_APP_BACKEND_URL. If neither is available, it falls back to an in-memory mock service.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private mock = inject(NotesMockService);

  private baseUrl: string | null;

  constructor() {
    // Resolve environment variables (Angular build can define via process.env if configured)
    const hasProcess = typeof globalThis !== 'undefined' && typeof (globalThis as any).process !== 'undefined';
    const envObj = hasProcess ? (globalThis as any).process.env ?? {} : {};
    const envBase = envObj['NG_APP_API_BASE'] || envObj['NG_APP_BACKEND_URL'];

    // Also check global for injected values if present (browser only)
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const winBase = g['NG_APP_API_BASE'] || g['NG_APP_BACKEND_URL'];

    this.baseUrl = (envBase || winBase || null);

    if (this.baseUrl) {
      this.baseUrl = this.baseUrl.replace(/\/+$/, '');
    } else {
      // No API configured — will use mock
      console.warn('[NotesService] No NG_APP_API_BASE/NG_APP_BACKEND_URL configured. Using in-memory mock service. TODO: Switch to real API when available.');
    }
  }

  private useMock(): boolean {
    return !this.baseUrl;
  }

  // PUBLIC_INTERFACE
  listNotes(): Observable<Note[]> {
    if (this.useMock()) return this.mock.listNotes();
    return this.http.get<Note[]>(`${this.baseUrl}/notes`);
  }

  // PUBLIC_INTERFACE
  getNote(id: string): Observable<Note> {
    if (this.useMock()) return this.mock.getNote(id);
    return this.http.get<Note>(`${this.baseUrl}/notes/${encodeURIComponent(id)}`);
  }

  // PUBLIC_INTERFACE
  createNote(payload: Pick<Note, 'title' | 'content'>): Observable<Note> {
    if (this.useMock()) return this.mock.createNote(payload);
    return this.http.post<Note>(`${this.baseUrl}/notes`, payload);
  }

  // PUBLIC_INTERFACE
  updateNote(id: string, payload: Partial<Pick<Note, 'title' | 'content'>>): Observable<Note> {
    if (this.useMock()) return this.mock.updateNote(id, payload);
    return this.http.put<Note>(`${this.baseUrl}/notes/${encodeURIComponent(id)}`, payload);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): Observable<{ success: boolean }> {
    if (this.useMock()) return this.mock.deleteNote(id);
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/notes/${encodeURIComponent(id)}`);
  }
}
