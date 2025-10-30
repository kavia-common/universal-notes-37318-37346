import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * ToastService
 * Lightweight toast notifications. Appends DOM nodes to body for simple feedback.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private container: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private ensureContainer() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.container) return;
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const doc: any = g.document ?? null;
    if (!doc) return;
    const el = doc.createElement('div');
    el.style.position = 'fixed';
    el.style.bottom = '16px';
    el.style.right = '16px';
    el.style.display = 'grid';
    el.style.gap = '8px';
    el.style.zIndex = '9999';
    doc.body.appendChild(el);
    this.container = el;
  }

  private show(message: string, bg: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ensureContainer();
    if (!this.container) return;
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const doc: any = g.document ?? null;
    const raf: any = g.requestAnimationFrame ?? ((fn: any) => (g.setTimeout ? g.setTimeout(fn, 16) : 0));
    const setTO: any = g.setTimeout ?? ((fn: any, t: number) => 0);

    const toast: any = doc ? doc.createElement('div') : {};
    toast.textContent = message;
    toast.style.padding = '10px 12px';
    toast.style.borderRadius = '10px';
    toast.style.color = 'white';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
    toast.style.background = bg;
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all .2s ease';
    this.container.appendChild(toast as HTMLElement);
    raf(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    setTO(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTO(() => (toast.remove ? toast.remove() : null), 250);
    }, 2200);
  }

  // PUBLIC_INTERFACE
  success(msg: string) { this.show(msg, '#16a34a'); }
  // PUBLIC_INTERFACE
  error(msg: string) { this.show(msg, '#EF4444'); }
  // PUBLIC_INTERFACE
  warn(msg: string) { this.show(msg, '#F59E0B'); }
}
