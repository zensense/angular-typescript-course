# 13. Capstone: Task Manager

Code: `../app/src/app/capstone/`
Route: `/capstone`

This ties together everything from Guides 2–11 into one small, real feature:
a task list with add/toggle/remove/filter, persisted to `localStorage`.

## The pieces, and which lesson each one comes from

- **`task.model.ts`** — a plain interface (TypeScript, Guide 1) describing a `Task`.
- **`task.service.ts`** — an injectable singleton (Guide 6) built entirely on
  signals (Guide 11): a private writable `signal<Task[]>`, a `computed()`
  filtered view, and an `effect()` that persists to `localStorage` any time
  the task list changes.
- **`task-form.component.ts`** — a Reactive Form (Guide 9), built with
  `inject(FormBuilder)`, that reports finished input upward via `@Output`
  (Guide 5) instead of reaching into `TaskService` itself.
- **`task-item.component.ts`** — a small "dumb" presentational component
  (Guide 5): it only knows the one `Task` it was given via `@Input` and
  reports `toggled`/`removed` events via `@Output`. It has no idea
  `TaskService` exists.
- **`task-list.component.ts`** — the "smart" container: it's the one
  component that actually injects `TaskService`, and it wires
  `TaskFormComponent` + `TaskItemComponent` together, listening to their
  outputs and calling the service.

This split — a component that owns the service connection, composed with
small components that only know `@Input`/`@Output` — is the same shape
you'll reach for in almost any real Angular feature, at any scale.

## Reading order

1. `task.model.ts` — the data shape.
2. `task.service.ts` — where the actual state and logic lives.
3. `task-item.component.ts` + its template — the simplest piece.
4. `task-form.component.ts` + its template — the Reactive Form.
5. `task-list.component.ts` + its template — how they're all wired together.
6. `task.service.spec.ts` — tests for the service's logic in isolation.

## Try it yourself — pick at least one

- **Editing in place**: click a task's title to turn it into an input,
  save on blur or Enter (this exercises the same "local component state +
  event" pattern as `child-counter.component.ts` in Guide 5).
- **Due dates**: add a `dueDate?: string` to `Task`, a date input to
  `task-form`, and sort or highlight overdue tasks in `task-list`.
- **Sync to a real backend**: replace the `localStorage` persistence with
  HTTP calls (Guide 10) to a fake backend — `json-server` is a good, quick
  option to run one locally against this exact `Task` shape.
- **Route per task**: add a route (Guide 7) at `/capstone/:id` showing a
  single task's detail view, reusing the routing patterns from
  `l06-routing`.

Once you're comfortable extending this, you've covered what you need to
build real Angular applications — the rest is depth and experience with the
same handful of building blocks: components, services, routing, forms, HTTP,
and signals.
