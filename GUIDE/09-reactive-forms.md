# 9. Reactive Forms

Code: `../app/src/app/lessons/l08-reactive-forms/reactive-signup/`
Route: `/l08-reactive-forms`

Reactive Forms build the form's model explicitly, in TypeScript, using
`FormBuilder`/`FormGroup`/`FormControl`. More upfront code than
template-driven forms, but the entire shape and validation of the form is
one readable object, fully typed, and testable without ever rendering HTML.

```ts
private fb = inject(FormBuilder);

signupForm = this.fb.group({
  username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
  email: this.fb.control('', [Validators.required, Validators.email]),
  age: this.fb.control<number | null>(null, [Validators.required, Validators.min(13)]),
});
```

Notice `inject(FormBuilder)` instead of constructor injection — this is the
same dependency injection from Guide 6, just called as a function. It has to
be used here (rather than `constructor(private fb: FormBuilder)`) because
`signupForm` is initialized as a class field, and class fields initialize
*before* the constructor body runs — so `this.fb` wouldn't exist yet if it
were only assigned inside the constructor. `inject()` works in field
initializers because it reads directly from Angular's active injection
context instead of waiting on the constructor.

## Wiring the template

```html
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
  <input formControlName="username" />
  @if (username.invalid && username.touched) {
    <p class="error">...</p>
  }
</form>
```
```ts
get username() { return this.signupForm.controls.username; }
```
`[formGroup]` connects the whole form; `formControlName` connects each
input to one control by name. Getter properties like `username` above just
make the template a little more readable than repeating
`signupForm.controls.username` everywhere.

## Custom validators

A validator is a plain function: `(control: AbstractControl) =>
ValidationErrors | null`.
```ts
function noSwearWords(control: AbstractControl): ValidationErrors | null {
  const banned = ['heck', 'darn'];
  return banned.some((w) => control.value?.toLowerCase().includes(w))
    ? { bannedWord: true }
    : null;
}
```
Angular's built-in validators (`Validators.required`, `.email`,
`.minLength`) are written exactly the same way — there's no special magic to
learn beyond "a function that returns null or an error object."

## Forcing validation messages on submit

```ts
onSubmit(): void {
  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched(); // shows every field's error at once
    return;
  }
}
```
Without this, a field the user never focused stays "untouched," and its
error message (gated on `.touched`) would never appear even on a failed
submit — this is what makes all validation messages show up immediately
when someone hits submit with a mostly-empty form.

## Try it yourself

Add a cross-field validator on the `FormGroup` itself (second argument to
`fb.group(...)`) requiring `username` and `email` not be identical strings.
