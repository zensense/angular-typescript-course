# 6. Services & Dependency Injection

Code: `../app/src/app/lessons/l05-services/`
Route: `/l05-services`

## The problem services solve

Components should mostly be about the view: templates, bindings, user
interaction. Logic that doesn't belong to any one view — talking to an API,
computing shared state, logging — belongs in a **service**: a plain class,
decorated with `@Injectable`, that Angular can hand to any component (or
other service) that asks for it.

```ts
@Injectable({ providedIn: 'root' })
export class CounterStoreService {
  private count = 0;
  getCount(): number { return this.count; }
  increment(): void { this.count++; }
}
```

`providedIn: 'root'` registers **one shared instance for the whole app** — a
singleton. Every component that injects `CounterStoreService` gets the exact
same instance, which is how two totally unrelated components can end up
sharing state without passing it through inputs/outputs at all.

## Constructor injection

```ts
export class ServicesDemoComponent {
  constructor(
    private logger: LoggerService,
    public counterStore: CounterStoreService,
  ) {}
}
```
Angular looks at the constructor's parameter *types* and supplies the
already-created instances automatically — you never write `new
CounterStoreService()` yourself. This is dependency injection: your class
declares what it needs, and the framework provides it.

(`public` vs `private` here just controls whether the *template* can read
`counterStore` directly — `public counterStore` lets
`{{ counterStore.getCount() }}` work in the HTML.)

## Why this matters beyond convenience

- **Testability** — in a unit test, you can inject a fake/mock service
  instead of the real one, without changing the component at all.
- **Single source of truth** — state living in a service, not scattered
  across components, avoids "which component's copy is correct?" bugs.
- **Lazy creation** — Angular only creates a service the first time
  something actually asks for it.

## Try it yourself

Add a `decrement()` method to `CounterStoreService` and a matching button in
`services-demo.component.html` that calls it.
