# 3. Data Binding

Code: `../app/src/app/lessons/l02-data-binding/binding-demo/`
Route: `/l02-data-binding`

Angular has four binding directions, all shown in `binding-demo.component.html`.

## Interpolation — `{{ expression }}`

Renders a TypeScript expression as text inside the template:
```html
<p>Hello, {{ username }}!</p>
```

## Property binding — `[property]="expression"`

Sets a DOM property (or a child component's `@Input`) from a TypeScript
expression. Square brackets mean "evaluate this," as opposed to a plain HTML
attribute, which is always a literal string.
```html
<input [value]="username" disabled />
<div [style.background]="boxColor">...</div>
<p [class.important]="isImportant">...</p>
```

## Event binding — `(event)="handler()"`

Runs a method when a DOM event fires. You can pass along the native event
object with `$event`:
```html
<button (click)="onButtonClick()">Click me</button>
<input (input)="onInputChange($event)" />
```

## Two-way binding — `[(ngModel)]="property"`

Shorthand combining property binding and event binding — keeps a form
control and a class property in sync in both directions. Requires importing
`FormsModule`:
```html
<input [(ngModel)]="username" />
```
`[(ngModel)]` is literally `[ngModel]="username" (ngModelChange)="username = $event"`
written as one binding — recognizing that expansion is the key to
understanding two-way binding once you see it elsewhere (you can build your
own two-way-bindable `@Input`/`@Output` pair the same way; see Lesson 4).

## A common early mistake

Forgetting the brackets:
```html
<input value="username" />   <!-- literal string "username", NOT the property -->
<input [value]="username" /> <!-- the TypeScript property `username` -->
```
If a binding "isn't working," check this first — it's the single most common
beginner bug in Angular templates.

## Try it yourself

Add a `fontSize = 16` property and bind it with
`[style.fontSize.px]="fontSize"` on the swatch `div`, then add buttons that
increment/decrement it.
