# 4. Directives & Pipes

Code: `../app/src/app/lessons/l03-directives-pipes/`
Route: `/l03-directives-pipes`

## Structural directives: two syntaxes, same job

Angular 17+ has built-in control-flow syntax (`@if`, `@for`, `@switch`),
which is now the recommended default for new code. Most existing Angular
code — anything on Angular <17, which is still a lot of production
codebases and older tutorials — uses the structural directives `*ngIf` /
`*ngFor` instead. They do the same job; `directives-demo.component.html`
shows both side by side so you can recognize either style.

Modern:
```html
@if (showDetails) { <p>Visible</p> }

@for (item of items; track item.id) {
  <li>{{ item.label }}</li>
}
```

Classic (needs `CommonModule` in `imports`):
```html
<p *ngIf="showDetails">Visible</p>

<li *ngFor="let item of items; trackBy: trackById">{{ item.label }}</li>
```

`track`/`trackBy` matters for lists: it tells Angular how to identify "the
same item" across re-renders, so it can update/reorder DOM nodes instead of
destroying and recreating them — important for both performance and
preserving things like input focus or CSS transition state within a list item.

## `ngClass` / `ngStyle`

Toggle multiple classes or styles from an object expression:
```html
<div [ngClass]="{ done: item.done, pending: !item.done }">...</div>
<div [ngStyle]="{ fontWeight: showDetails ? 'bold' : 'normal' }">...</div>
```
For a single class or style property, the simpler `[class.x]`/`[style.x]`
bindings from Lesson 3 are usually clearer; reach for `ngClass`/`ngStyle`
when you're toggling several at once from one object.

## Custom pipes

A pipe transforms a value for *display*, right in the template, via
`value | pipeName`. `shout.pipe.ts`:
```ts
@Pipe({ name: 'shout', standalone: true })
export class ShoutPipe implements PipeTransform {
  transform(value: string, times = 1): string {
    return value.toUpperCase() + '!'.repeat(times);
  }
}
```
Used as `{{ 'angular is fun' | shout:3 }}`. Pipes are meant to be pure
functions — same input, same output, no side effects — which is exactly why
Angular can skip re-running them unless the input actually changes.

## Custom attribute directives

An attribute directive changes the behavior/appearance of the element it's
placed on, without adding its own template. `highlight.directive.ts` uses
`@HostListener` to react to `mouseenter`/`mouseleave` on whatever element has
`appHighlight` on it — this is how Angular's own `ngClass`/`ngStyle` work
under the hood, just simplified.

## Try it yourself

Add a `reverse` pipe (same shape as `shout.pipe.ts`) that reverses a string,
and use it on a paragraph in `directives-demo.component.html`.
