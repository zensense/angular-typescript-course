import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShoutPipe } from '../shout.pipe';
import { HighlightDirective } from '../highlight.directive';

interface Item {
  id: number;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [CommonModule, ShoutPipe, HighlightDirective],
  templateUrl: './directives-demo.component.html',
  styleUrl: './directives-demo.component.css',
})
export class DirectivesDemoComponent {
  showDetails = true;
  items: Item[] = [
    { id: 1, label: 'Learn TypeScript', done: true },
    { id: 2, label: 'Build a component', done: true },
    { id: 3, label: 'Ship the capstone', done: false },
  ];

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }

  toggleDone(item: Item): void {
    item.done = !item.done;
  }
}
