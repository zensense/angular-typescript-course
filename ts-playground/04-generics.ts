// ============================================================
// 04 — Generics: writing reusable, type-safe code
// ============================================================
// Generics let a function, class, or interface work with *any* type while
// still keeping full type safety — instead of falling back to `any`.
// Angular's HttpClient, RxJS Observables, and Angular Forms are all built
// heavily on generics (you'll see `Observable<T>`, `FormControl<T>` etc).

// ---- 1. A generic function ----
// Without generics you'd either duplicate this per type, or use `any` and
// lose all type checking. `<T>` says "T is decided by whoever calls this."
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
console.log(firstElement([1, 2, 3]));         // T inferred as number
console.log(firstElement(["a", "b"]));        // T inferred as string

// ---- 2. Multiple type parameters ----
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
const p = pair("age", 31); // [string, number]

// ---- 3. Generic constraints ----
// `extends` here doesn't mean class inheritance — it restricts what T is
// allowed to be, so you can safely use properties of that shape.
interface HasId {
  id: number;
}
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}
console.log(findById([{ id: 1, title: "A" }, { id: 2, title: "B" }], 2));

// ---- 4. Generic interfaces ----
interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}
const userResponse: ApiResponse<{ name: string }> = {
  data: { name: "Jeff" },
  status: 200,
};

// ---- 5. Generic classes ----
class Box<T> {
  private contents: T;
  constructor(value: T) {
    this.contents = value;
  }
  get(): T {
    return this.contents;
  }
  set(value: T): void {
    this.contents = value;
  }
}
const numberBox = new Box<number>(42);
const stringBox = new Box("hello"); // T inferred as string

// ---- 6. Default type parameters ----
interface Pagination<T = string> {
  items: T[];
  page: number;
}
const defaultPage: Pagination = { items: ["a", "b"], page: 1 }; // T defaults to string

// ---- 7. A realistic example: a generic in-memory cache ----
// (This is very close to the shape of a small Angular data service.)
class MemoryCache<T> {
  private store = new Map<string, T>();

  set(key: string, value: T): void {
    this.store.set(key, value);
  }
  get(key: string): T | undefined {
    return this.store.get(key);
  }
  has(key: string): boolean {
    return this.store.has(key);
  }
}
const userCache = new MemoryCache<{ id: number; name: string }>();
userCache.set("u1", { id: 1, name: "Jeff" });
console.log(userCache.get("u1"));

// ============================================================
// EXERCISE 1: Write a generic function `last<T>(arr: T[]): T | undefined`
// that returns the last element of an array.
// ============================================================

// EXERCISE 2: Write a generic class `Pair<A, B>` with a constructor taking
// (first: A, second: B), a `swap(): Pair<B, A>` method, and a `toString()`
// method.

// EXERCISE 3: Write `function groupBy<T, K extends string | number>(items:
// T[], keyFn: (item: T) => K): Record<K, T[]>` that groups an array into
// buckets by a computed key. Try it on an array of `{ name: string; team:
// string }` objects, grouping by `team`.
