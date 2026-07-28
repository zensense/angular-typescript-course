import { Injectable } from '@angular/core';

// @Injectable marks a class as available to Angular's dependency injection
// (DI) system. `providedIn: 'root'` registers ONE shared instance for the
// whole app (a singleton) — any component or service that asks for
// LoggerService in its constructor gets the exact same instance.
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private history: string[] = [];

  log(message: string): void {
    const entry = `[${new Date().toLocaleTimeString()}] ${message}`;
    this.history.push(entry);
    console.log(entry);
  }

  getHistory(): string[] {
    return this.history;
  }
}
