# 2. Components & Templates

Code: `../app/src/app/lessons/l01-components/` (`hello-world`, `profile-card`)
Route: `/l01-components`

## What a component actually is

A component is a TypeScript class decorated with `@Component`, paired with a
template (HTML) and optionally a stylesheet (CSS). Angular instantiates one
of these for every place its selector appears in a template.

```ts
@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
})
export class ProfileCardComponent {
  @Input() name = '';
}
```

- `selector` — the custom HTML tag other templates use: `<app-profile-card>`.
- `standalone: true` — this component declares its own dependencies directly
  (see `imports` below) instead of belonging to an NgModule. This has been
  the default, recommended style since Angular 17. You'll still encounter
  NgModules in older codebases, but you don't need to learn them to write or
  understand modern Angular.
- `imports` — every component, directive, or pipe *used in this component's
  template* must be listed here. Forget one and you'll get a clear compiler
  error naming the missing import — a very typical early mistake, and an
  easy one to fix once you know what the error means.

## Composition: components inside components

`hello-world.component.html` uses `<app-profile-card>` inside a `@for` loop,
passing different data to each instance via property bindings:

```html
@for (member of team; track member.name) {
  <app-profile-card [name]="member.name" [role]="member.role" />
}
```

This is the whole mental model of an Angular UI: small components, each
responsible for one piece of the screen, composed into larger ones. A page
is a tree of components.

## Try it yourself

Open `hello-world.component.ts` and add a third object to the `team` array —
confirm a third card renders with no other changes needed. Then create a new
component (`ng generate component lessons/l01-components/stat-badge` from
inside `../app`) that takes a `label` and `value` `@Input`, and drop a couple
into `hello-world.component.html`.
