import { Injectable, computed, signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// Signals are Angular's modern reactive primitive (stable since Angular
// 17). A signal wraps a value; reading it (`mySignal()`) inside a template
// or a `computed()`/`effect()` automatically registers that spot as a
// dependent — when the signal changes, only the things that actually read
// it get updated, with no separate change-detection pass needed across the
// whole component tree the way zone.js-based change detection works.
@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  private nextId = 1;

  // `signal(initialValue)` — a writable signal.
  private readonly _todos = signal<Todo[]>([]);

  // Expose a read-only view to consumers; only this service can call
  // `.set()`/`.update()` on the private signal above.
  readonly todos = this._todos.asReadonly();

  // `computed()` derives a new signal from other signals. It re-evaluates
  // automatically whenever a signal it reads changes, and — like the
  // signals it depends on — is cached until one of those dependencies
  // actually changes.
  readonly remainingCount = computed(() => this._todos().filter((t) => !t.done).length);
  readonly completedCount = computed(() => this._todos().filter((t) => t.done).length);

  add(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    // `.update()` takes the current value and returns the next value —
    // always produce a NEW array/object rather than mutating in place, the
    // same rule you'd follow with React state or an NgRx reducer.
    this._todos.update((todos) => [...todos, { id: this.nextId++, title: trimmed, done: false }]);
  }

  toggle(id: number): void {
    this._todos.update((todos) => todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number): void {
    this._todos.update((todos) => todos.filter((t) => t.id !== id));
  }
}
