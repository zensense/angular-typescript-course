import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

// A custom validator — a plain function taking an AbstractControl and
// returning either `null` (valid) or an error object (invalid). Angular's
// built-in validators (`Validators.required`, `.email`, `.minLength`) are
// written exactly the same way.
function noSwearWords(control: AbstractControl): ValidationErrors | null {
  const banned = ['heck', 'darn'];
  const value = (control.value ?? '').toLowerCase();
  return banned.some((word) => value.includes(word)) ? { bannedWord: true } : null;
}

@Component({
  selector: 'app-reactive-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-signup.component.html',
  styleUrl: './reactive-signup.component.css',
})
export class ReactiveSignupComponent {
  // Reactive Forms build the form model explicitly, in TypeScript, using
  // FormBuilder/FormGroup/FormControl. This is more verbose than Lesson 7's
  // template-driven style up front, but scales much better: the whole shape
  // and validation of the form is one readable object, easy to unit test
  // without rendering any HTML at all.
  // `inject()` reads a dependency from Angular's injector right where it's
  // called — it works in field initializers (which run before the
  // constructor body executes), unlike constructor injection below, which
  // is why FormBuilder is grabbed this way instead.
  private fb = inject(FormBuilder);

  signupForm = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(3), noSwearWords]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    age: this.fb.control<number | null>(null, [Validators.required, Validators.min(13)]),
  });

  submitted = false;

  get username() {
    return this.signupForm.controls.username;
  }
  get email() {
    return this.signupForm.controls.email;
  }
  get age() {
    return this.signupForm.controls.age;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // forces validation messages to show
      return;
    }
    this.submitted = true;
    // .value is fully typed based on the FormBuilder definition above.
    console.log('Submitted:', this.signupForm.value);
  }
}
