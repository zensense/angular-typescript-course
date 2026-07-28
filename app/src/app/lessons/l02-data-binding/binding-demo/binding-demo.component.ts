import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding-demo',
  standalone: true,
  imports: [FormsModule], // needed for [(ngModel)] below
  templateUrl: './binding-demo.component.html',
  styleUrl: './binding-demo.component.css',
})
export class BindingDemoComponent {
  username = 'Jeff';
  clickCount = 0;
  isImportant = true;
  boxColor = '#2563eb';

  onButtonClick(): void {
    this.clickCount++;
  }

  // Event binding can also pass along the native DOM event object.
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Raw input event value:', target.value);
  }
}
