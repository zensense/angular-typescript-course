import { Injectable, computed, effect, signal } from '@angular/core';
import { Priority, Task } from './task.model';

const STORAGE_KEY = 'angular-course-capstone-tasks';

function loadFromStorage(): Task[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return []; // corrupt/old data shouldn't crash the app
  }
}

export type TaskFilter = 'all' | 'active' | 'completed';

// This service is the capstone's "put it all together" piece: it's an
// injectable singleton (Lesson 5), built on signals (Lesson 10), and its
// shape mirrors exactly what you'd reach for in a small real app before
// bringing in a heavier state library.
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<Task[]>(loadFromStorage());
  private readonly _filter = signal<TaskFilter>('all');

  readonly filter = this._filter.asReadonly();

  readonly tasks = computed(() => {
    const all = this._tasks();
    switch (this._filter()) {
      case 'active':
        return all.filter((t) => !t.done);
      case 'completed':
        return all.filter((t) => t.done);
      default:
        return all;
    }
  });

  readonly totalCount = computed(() => this._tasks().length);
  readonly activeCount = computed(() => this._tasks().filter((t) => !t.done).length);

  constructor() {
    // `effect()` re-runs any time a signal it reads changes — here, every
    // time the underlying task list changes, we persist it. This is how you
    // bridge signals to a side effect (storage, logging, analytics) without
    // manually wiring a subscription.
    effect(() => {
      const tasks = this._tasks();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      }
    });
  }

  setFilter(filter: TaskFilter): void {
    this._filter.set(filter);
  }

  add(title: string, priority: Priority): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    const task: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      priority,
      done: false,
      createdAt: Date.now(),
    };
    this._tasks.update((tasks) => [task, ...tasks]);
  }

  toggle(id: string): void {
    this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: string): void {
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
