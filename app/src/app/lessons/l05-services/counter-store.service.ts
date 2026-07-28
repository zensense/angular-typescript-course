import { Injectable } from '@angular/core';

// This service holds STATE (not just behavior) shared across components.
// Any component that injects CounterStoreService reads and writes the same
// `count` — this is the simplest possible "shared state" pattern in
// Angular, well before you'd reach for anything like NgRx.
@Injectable({
  providedIn: 'root',
})
export class CounterStoreService {
  private count = 0;

  getCount(): number {
    return this.count;
  }

  increment(): void {
    this.count++;
  }

  reset(): void {
    this.count = 0;
  }
}
