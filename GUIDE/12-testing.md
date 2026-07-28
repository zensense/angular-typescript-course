# 12. Testing

Code (examples worth reading in full):
- `../app/src/app/lessons/l03-directives-pipes/shout.pipe.spec.ts`
- `../app/src/app/lessons/l05-services/counter-store.service.spec.ts`
- `../app/src/app/capstone/task.service.spec.ts`
- every `*.component.spec.ts` next to a component

Angular CLI projects come with a testing setup already wired up: **Jasmine**
(the testing framework — `describe`/`it`/`expect`) plus **Karma** (the test
runner, which executes specs in a real browser). Run the suite with:
```
cd app
npm test
```
This opens a browser and re-runs on every save. (Running it needs an actual
browser installed, e.g. Chrome — it isn't runnable in the sandbox this
project was generated in, but it will work on your machine.)

## The three levels, from simplest to most involved

**1. Pure functions/pipes — no Angular machinery needed at all.**
```ts
describe('ShoutPipe', () => {
  let pipe: ShoutPipe;
  beforeEach(() => { pipe = new ShoutPipe(); });

  it('uppercases the input', () => {
    expect(pipe.transform('hello')).toBe('HELLO!');
  });
});
```
Just `new` the class and call the method. If it doesn't touch Angular's DI
or change detection, don't reach for anything heavier than this.

**2. Services — `TestBed` builds a small Angular injector.**
```ts
describe('CounterStoreService', () => {
  let service: CounterStoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterStoreService);
  });

  it('increments the count', () => {
    service.increment();
    expect(service.getCount()).toBe(1);
  });
});
```
`TestBed.inject(...)` constructs the service the same way the real app
would (including any of *its* injected dependencies), so `@Injectable`
services behave identically in tests and in the app.

**3. Components — a `ComponentFixture` gives you the rendered DOM.**
This is what the CLI generates by default for every component:
```ts
describe('HelloWorldComponent', () => {
  let component: HelloWorldComponent;
  let fixture: ComponentFixture<HelloWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldComponent], // standalone components import like this in tests too
    }).compileComponents();

    fixture = TestBed.createComponent(HelloWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers initial rendering
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
From here you can inspect `fixture.nativeElement.querySelector(...)` to
assert on rendered HTML, or call `fixture.detectChanges()` again after
changing a component property to re-render and check the update.

## What's actually worth testing

Not everything needs (or benefits from) a test. Good candidates: services
with real logic (`TaskService`'s add/toggle/filter behavior — see
`task.service.spec.ts` for a fuller example), custom pipes/validators (pure,
cheap, high value), and components with meaningful conditional
logic/computed values. Skip writing elaborate tests for components that are
pure markup with no logic of their own — the value isn't there.

## Try it yourself

Write a spec for `HighlightDirective` (`l03-directives-pipes/highlight.directive.ts`)
that creates a test host component with `<p appHighlight>` in its template,
triggers a simulated `mouseenter`, and asserts the element's
`style.backgroundColor` changed.
