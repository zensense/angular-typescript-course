// ============================================================
// 05 — Advanced Types: narrowing, utility types, mapped types, decorators
// ============================================================

// ---- 1. Type narrowing with type guards ----
type Animal = { kind: "dog"; bark(): void } | { kind: "cat"; meow(): void };

function makeSound(animal: Animal) {
  if (animal.kind === "dog") {
    animal.bark(); // TS knows it's the dog branch here
  } else {
    animal.meow();
  }
}

// A custom type guard function — the `is` return type teaches TS to narrow
// wherever this function is used in an `if`.
function isString(value: unknown): value is string {
  return typeof value === "string";
}
function printLength(value: unknown) {
  if (isString(value)) {
    console.log(value.length); // safe: narrowed to string
  }
}

// ---- 2. Built-in utility types ----
interface Todo {
  id: number;
  title: string;
  done: boolean;
  notes: string;
}

// Partial<T> — every property becomes optional. Perfect for "patch" updates.
function updateTodo(todo: Todo, patch: Partial<Todo>): Todo {
  return { ...todo, ...patch };
}

// Pick<T, K> — take only some properties
type TodoPreview = Pick<Todo, "id" | "title">;

// Omit<T, K> — take everything EXCEPT some properties
type TodoWithoutNotes = Omit<Todo, "notes">;

// Readonly<T> — every property becomes readonly
const frozenTodo: Readonly<Todo> = { id: 1, title: "Learn TS", done: false, notes: "" };
// frozenTodo.done = true; // Error

// Record<K, T> — build an object type mapping every key in K to type T
type TodosByStatus = Record<"active" | "completed", Todo[]>;
const buckets: TodosByStatus = { active: [], completed: [] };

// Required<T> — opposite of Partial: every optional property becomes required
interface Options {
  timeout?: number;
  retries?: number;
}
const strictOptions: Required<Options> = { timeout: 3000, retries: 3 };

// ---- 3. Mapped types (how Partial/Readonly etc are actually built) ----
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// ---- 4. `keyof` and indexed access ----
type TodoKeys = keyof Todo;              // "id" | "title" | "done" | "notes"
type TitleType = Todo["title"];          // string

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const someTodo: Todo = { id: 1, title: "Ship it", done: false, notes: "" };
console.log(getProp(someTodo, "title")); // fully type-checked — "title" must be a key of Todo

// ---- 5. Decorators (experimentalDecorators) ----
// Angular is built almost entirely on decorators (@Component, @Injectable,
// @Input, @Output...). A decorator is just a function that wraps/annotates
// a class, method, or property, run at *class definition* time.
function LogClass(constructor: Function) {
  console.log(`Class defined: ${constructor.name}`);
}

@LogClass
class Widget {
  constructor(public name: string) {}
}
new Widget("Button"); // logs "Class defined: Widget" once, when the module loads

// A method decorator — this is the same mechanical idea Angular uses
// internally, just simplified.
function LogCall(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @LogCall
  add(a: number, b: number): number {
    return a + b;
  }
}
new Calculator().add(2, 3); // logs the call, then returns 5

// ============================================================
// EXERCISE 1: Write a type guard `isTodo(value: unknown): value is Todo`
// that checks `value` is a non-null object with `id` (number) and `title`
// (string) properties.
// ============================================================

// EXERCISE 2: Using `Pick` and `Omit`, define `TodoSummary` as a Todo with
// only `id`, `title`, and `done` — first using `Pick`, then rewrite it
// using `Omit`. Confirm both produce the same shape.

// EXERCISE 3: Write a mapped type `Nullable<T>` that makes every property
// of T allow `null` in addition to its original type
// (`{ [K in keyof T]: T[K] | null }`), then apply it to `Todo`.
