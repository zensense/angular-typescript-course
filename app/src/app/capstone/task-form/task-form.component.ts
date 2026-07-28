import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority } from '../task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  // A Reactive Form (Lesson 8), used here inside a small, focused,
  // reusable component that reports finished data upward via @Output
  // (Lesson 4) rather than reaching into TaskService itself — that keeps
  // this component reusable and easy to test in isolation.
  private fb = inject(FormBuilder); // see reactive-signup.component.ts for why `inject()` here

  form = this.fb.group({
    title: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    priority: this.fb.control<Priority>('medium', [Validators.required]),
  });

  @Output() taskAdded = new EventEmitter<{ title: string; priority: Priority }>();


  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, priority } = this.form.getRawValue();
    this.taskAdded.emit({ title: title!, priority: priority! });
    this.form.reset({ title: '', priority: 'medium' });
  }
}
