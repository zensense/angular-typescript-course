# 1. TypeScript Deep Dive

Work through `../ts-playground/` alongside this guide — the files are numbered
to match these sections. Run each one (`npx tsc file.ts --outDir dist &&
node dist/file.js`) and actually do the `// EXERCISE:` comments before moving on.

## Why TypeScript exists

JavaScript doesn't check types until your code actually runs — a typo in a
property name, or passing a string where a function expected a number, only
surfaces as a runtime error, potentially in production. TypeScript adds a type
checker that runs at *compile time*, in your editor and in your build, so
these mistakes get caught before the code ever runs. It compiles down to
plain JavaScript — types are erased entirely; they cost nothing at runtime.

Angular is written in TypeScript and every Angular API is fully typed, which
is a large part of why the framework's tooling (autocomplete, refactoring,
inline errors) feels as good as it does.

## Core types (`ts-playground/01-basics.ts`)

TypeScript's basic types map directly onto JavaScript's own values: `string`,
`number`, `boolean`, `null`, `undefined`, arrays (`number[]`), and the special
types `any` (opts out of checking — avoid it), `unknown` (safe version of
`any`, must be narrowed before use), `void` (function returns nothing) and
`never` (function never returns, e.g. always throws).

Enums (`enum Direction { Up, Down }`) give you a named set of constants —
useful for things like status codes, form states, and action types.

## Interfaces & type aliases (`02-interfaces-types.ts`)

Both describe the *shape* of an object. Use `interface` for object/class
shapes you expect to extend; use `type` when you need unions, tuples, or to
alias a function/primitive type. **Discriminated unions** — a shared literal
field like `kind: "loading" | "success" | "error"` used to switch between
variants — are the single most useful pattern here, and you'll see the same
shape again in Angular route data, NgRx actions, and API response modeling.

## Classes (`03-classes.ts`)

Every Angular component, service, directive, and pipe is a class. The pieces
that matter most going forward:
- **Constructor parameter properties** (`constructor(private http:
  HttpClient) {}`) — Angular's dependency injection (Guide 6) is built
  entirely around this shorthand.
- **Access modifiers** (`public`/`private`/`protected`/`readonly`) — control
  what a template or another class can reach into.
- **Decorators** (`@Component`, `@Injectable`) — a decorator is a function
  that runs once, at class-definition time, and attaches metadata to the
  class. This is *the* mechanism Angular is built on; `05-advanced-types.ts`
  shows you how to write your own so the magic is demystified before you see
  Angular's versions.

## Generics (`04-generics.ts`)

A generic lets a function, class, or interface work with *any* type while
keeping full type safety, instead of degrading to `any`. You will see this
constantly in Angular:
- `Observable<T>` (RxJS, Guide 10) — "a stream that eventually emits values of type T"
- `HttpClient.get<T>(url)` — "the response body, typed as T"
- `FormControl<T>` (Reactive Forms, Guide 9) — "a form field holding a value of type T"

If generics feel abstract, `04-generics.ts`'s `Cache<T>` / `Box<T>` examples
are worth re-reading until the `<T>` stops feeling like noise — once it
clicks, the standard library APIs above stop feeling foreign.

## Advanced types (`05-advanced-types.ts`)

- **Type narrowing** — `typeof`, `instanceof`, and custom type guards
  (`function isX(v): v is X`) let you go from a wide type (`unknown`, a
  union) to a specific one inside an `if`.
- **Utility types** — `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`,
  `Readonly<T>`, `Record<K, T>` — these derive new types from existing ones
  instead of hand-writing duplicate interfaces. You'll reach for `Partial<T>`
  constantly when writing "update" functions that only touch some fields.
- **Decorators** — the mechanical basis for everything in the next guide.

## Where TypeScript and Angular actually meet

Every `.ts` file in `../app/src/app` uses everything above:

```ts
@Component({ ... })                 // a class decorator
export class ProductListComponent { // a class
  @Input() category!: string;       // a property decorator + definite assignment
  products: Product[] = [];         // an array, typed with an interface

  constructor(private productService: ProductService) {} // parameter property + DI

  loadProducts(): void {            // typed method, void return
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
```

If every piece of that snippet is legible, you're ready to move into
`../app` and Guide 2.
