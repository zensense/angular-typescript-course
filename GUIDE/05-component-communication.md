# 5. Component Communication

Code: `../app/src/app/lessons/l04-communication/` (`parent-demo`, `child-counter`)
Route: `/l04-communication`

## Parent → child: `@Input`

```ts
export class ChildCounterComponent {
  @Input() startValue = 0;
  @Input() label = 'Counter';
}
```
```html
<app-child-counter [startValue]="5" label="Counter A" />
```
Note `label="Counter A"` (no brackets) works too, for a literal string —
brackets are only required when the value is a TypeScript expression.

## Child → parent: `@Output`

```ts
export class ChildCounterComponent {
  @Output() countChanged = new EventEmitter<number>();

  increment(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }
}
```
```html
<app-child-counter (countChanged)="onCountAChanged($event)" />
```
`$event` here is whatever value was passed to `.emit(...)` — in this case a
`number`, because `EventEmitter<number>` says so.

This `@Input`/`@Output` pair is *the* standard way components talk to each
other in Angular, and it composes: a parent can be another component's
child, forwarding data and events up the tree.

## Reacting to input changes: `ngOnChanges`

```ts
export class ChildCounterComponent implements OnChanges {
  ngOnChanges(): void {
    this.count = this.startValue; // runs whenever an @Input changes
  }
}
```

## The escape hatch: `@ViewChild`

```ts
@ViewChild('counterB') counterB?: ChildCounterComponent;

resetCounterB(): void {
  this.counterB!.count = 0;
}
```
```html
<app-child-counter #counterB [startValue]="10" />
```
`@ViewChild` gives a parent a direct reference to a specific child instance
matched by a template reference variable (`#counterB`). It's useful when
`@Input`/`@Output` genuinely aren't enough (e.g. calling an imperative method
on a child, like focusing an input) — but should be the exception, not the
default. Prefer `@Input`/`@Output` first.

## Try it yourself

Add a third `<app-child-counter>` and change the parent to track *all*
emitted values in an array, rendering the full history instead of just the
last value.
