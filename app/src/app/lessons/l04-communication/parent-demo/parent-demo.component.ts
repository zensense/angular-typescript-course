import { Component, ViewChild } from '@angular/core';
import { ChildCounterComponent } from '../child-counter/child-counter.component';

@Component({
  selector: 'app-parent-demo',
  standalone: true,
  imports: [ChildCounterComponent],
  templateUrl: './parent-demo.component.html',
})
export class ParentDemoComponent {
  totalClicks = 0;
  lastValueFromA = 0;

  // @ViewChild gives the parent a direct reference to a child component
  // instance in the template — an escape hatch for when @Input/@Output
  // aren't enough (e.g. calling a method on the child directly). Use it
  // sparingly; @Input/@Output should be your default.
  @ViewChild('counterB') counterB?: ChildCounterComponent;

  onCountAChanged(value: number): void {
    this.lastValueFromA = value;
    this.totalClicks++;
  }

  resetCounterB(): void {
    if (this.counterB) {
      this.counterB.count = 0;
    }
  }
}
