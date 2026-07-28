import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-child-counter',
  standalone: true,
  imports: [],
  templateUrl: './child-counter.component.html',
  styleUrl: './child-counter.component.css',
})
export class ChildCounterComponent implements OnChanges {
  // Data flows DOWN into a child via @Input...
  @Input() startValue = 0;
  @Input() label = 'Counter';

  // ...and events flow UP out of a child via @Output. The parent never
  // reaches into this component's internals — it just listens for
  // `countChanged` and decides what to do with the new value.
  @Output() countChanged = new EventEmitter<number>();

  count = 0;

  ngOnChanges(): void {
    // Runs whenever an @Input value changes (including on first render).
    this.count = this.startValue;
  }

  increment(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }

  decrement(): void {
    this.count--;
    this.countChanged.emit(this.count);
  }
}
