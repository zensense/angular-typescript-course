import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  // A small, "dumb" presentational component (Lesson 4): all it knows is
  // the task it was given and how to report user actions back up. It has
  // no idea TaskService even exists.
  @Input({ required: true }) task!: Task;
  @Output() toggled = new EventEmitter<string>();
  @Output() removed = new EventEmitter<string>();
}
