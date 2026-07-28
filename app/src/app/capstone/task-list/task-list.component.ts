import { Component } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService, TaskFilter } from '../task.service';
import { Priority } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskFormComponent, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  // This component is the "smart" container: it owns the connection to
  // TaskService and wires two small presentational components
  // (TaskFormComponent, TaskItemComponent) together — the same
  // parent/child, service-mediated pattern from Lessons 4 and 5, just
  // assembled into something a little closer to a real feature.
  constructor(public tasks: TaskService) {}

  onTaskAdded(event: { title: string; priority: Priority }): void {
    this.tasks.add(event.title, event.priority);
  }

  setFilter(filter: TaskFilter): void {
    this.tasks.setFilter(filter);
  }
}
