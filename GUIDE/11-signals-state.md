# 11. Signals & State

Code: `../app/src/app/lessons/l10-signals/`
Route: `/l10-signals`

Signals are Angular's modern reactivity primitive, stable since Angular 17
and the direction the framework is actively moving (including an emerging
signals-based alternative to `@Input`/`@Output` in newer versions — the
fundamentals below are what all of that is built on).

## Reading, writing, and deriving

```ts
private readonly _todos = signal<Todo[]>([]);
readonly todos = this._todos.asReadonly();

readonly remainingCount = computed(() => this._todos().filter((t) => !t.done).length);
```
- `signal(initialValue)` creates a writable signal.
- You **read** a signal by *calling* it: `todos()`, not `todos`. That call
  is what lets Angular (or a `computed`, or a template) know exactly where
  each signal is being used.
- `computed()` derives a new signal from others. It re-evaluates only when a
  signal it actually reads changes, and is cached in between — cheap to read
  as often as you like.
- `.asReadonly()` exposes a read-only view so only the service itself can
  call `.set()`/`.update()` — consumers can read but not mutate directly.

## Updating a signal: always produce a new value

```ts
add(title: string): void {
  this._todos.update((todos) => [...todos, { id: this.nextId++, title, done: false }]);
}
```
`.update()` takes the current value and returns the next one. Always build
a *new* array/object (`[...todos, newItem]`, `{ ...item, done: true }`)
rather than mutating the existing one in place — the same discipline you'd
follow with React state or an NgRx reducer, and for the same reason: Angular
(and anything relying on reference equality to detect "did this change?")
needs a new reference to notice.

## Signals in a template

```html
<p>{{ store.remainingCount() }} remaining</p>
@for (todo of store.todos(); track todo.id) { ... }
```
Same rule as everywhere else — call it to read it.

## Local component state as a signal

```ts
newTitle = signal('');
```
```html
<input [ngModel]="newTitle()" (ngModelChange)="newTitle.set($event)" />
```
Not every piece of state needs to live in a service — a signal scoped to
just one component works exactly the same way, just without being shared.

## Signals vs RxJS Observables — when to use which

Both represent "a value that changes over time," but they solve different
problems. Signals are for **synchronous application state** you read
directly in templates and computations (todo lists, form values, UI toggles)
— simpler to reason about, no subscription management. Observables (Guide
10) are for **asynchronous streams and events over time** (HTTP responses,
WebSocket messages, keystrokes you want to debounce) — RxJS's large operator
library (`switchMap`, `debounceTime`, `retry`, etc.) has no real signals
equivalent yet. In practice, real apps use both: HTTP calls come back as
Observables, and you'd often convert the *result* into a signal (via
`toSignal()`) once it lands, then treat it like any other piece of signal
state from there on.

## Try it yourself

Add a `computed()` signal `allDone` that's `true` when the list is
non-empty and every todo is done, and show a "🎉 All done!" message when it is.
