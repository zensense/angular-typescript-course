import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  // Template-driven forms keep the "source of truth" in the TEMPLATE
  // (ngModel, ngModelGroup, required, minlength directives) — Angular
  // builds a FormGroup/FormControl model behind the scenes for you. This
  // style is quick for simple forms; Lesson 8 shows the alternative
  // (Reactive Forms), where the model is built explicitly in TypeScript,
  // which scales much better for complex forms.
  model = {
    username: '',
    email: '',
    age: null as number | null,
  };

  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    console.log('Submitted:', this.model);
  }
}
