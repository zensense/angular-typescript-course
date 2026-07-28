import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStoreService } from '../todo-store.service';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css',
})
export class TodoAppComponent {
  // A LOCAL signal — state that belongs to this component only, not shared
  // app-wide (contrast with TodoStoreService's signals, which are shared).
  newTitle = signal('');

  constructor(public store: TodoStoreService) {}

  addTodo(): void {
    this.store.add(this.newTitle());
    this.newTitle.set('');
  }
}
