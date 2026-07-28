# 8. Template-Driven Forms

Code: `../app/src/app/lessons/l07-template-forms/signup-form/`
Route: `/l07-template-forms`

Template-driven forms keep the "source of truth" in the **template**:
`ngModel`, `required`, `minlength` directives on each input. Angular builds a
`FormGroup`/`FormControl` model behind the scenes for you. Requires
`FormsModule` in the component's `imports`.

```html
<form #signupForm="ngForm" (ngSubmit)="onSubmit(signupForm)">
  <input
    name="username"
    [(ngModel)]="model.username"
    required
    minlength="3"
    #username="ngModel"
  />
  @if (username.invalid && username.touched) {
    <p class="error">Username must be at least 3 characters.</p>
  }

  <button type="submit" [disabled]="signupForm.invalid">Sign up</button>
</form>
```

Pieces worth noticing:
- `#signupForm="ngForm"` — a template reference variable bound to Angular's
  auto-created form directive, giving you `.valid`/`.invalid`/`.value` on
  the whole form.
- `#username="ngModel"` — same idea, scoped to one control, so you can check
  `.invalid`/`.touched` for validation messages on that field specifically.
- Every input needs a unique `name` attribute — Angular uses it as the key
  in the underlying form model.

## When this style is a good fit

Small, simple forms with straightforward validation. It's quick to write and
reads naturally alongside the markup. For anything with cross-field
validation, dynamic fields (add/remove rows), or forms you want to unit test
without rendering a template, Reactive Forms (Guide 9) hold up much better —
which is why most non-trivial production apps default to Reactive Forms.

## Try it yourself

Add a "confirm password" field with a validation message that appears when
it doesn't match a `password` field (add that field first, following the
same pattern as `username`).
