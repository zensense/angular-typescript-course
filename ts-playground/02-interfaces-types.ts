// ============================================================
// 02 — Interfaces & Type Aliases
// ============================================================
// Interfaces and type aliases both describe the *shape* of data. In Angular
// you'll use them constantly to describe API responses, component inputs,
// and configuration objects.

// ---- 1. A basic interface ----
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

const jeff: User = {
  id: 1,
  name: "Jeff",
  email: "tacolover@icloud.com",
  isAdmin: false,
};

// ---- 2. Optional and readonly properties ----
interface Product {
  readonly sku: string;   // can be set once (e.g. in an object literal), never reassigned
  name: string;
  price: number;
  description?: string;   // `?` = optional, may be omitted
}

const product: Product = { sku: "ABC-123", name: "Widget", price: 9.99 };
// product.sku = "XYZ";   // Error! readonly properties can't be reassigned.

// ---- 3. Nested / composed shapes ----
interface Address {
  street: string;
  city: string;
  zip: string;
}

interface Customer extends User {
  address: Address;
}

const customer: Customer = {
  ...jeff,
  address: { street: "1 Main St", city: "Austin", zip: "78701" },
};

// ---- 4. Function types on an interface ----
interface Calculator {
  (a: number, b: number): number; // this interface describes a callable
}
const add: Calculator = (a, b) => a + b;

// A more common pattern: a method on an object shape.
interface Logger {
  log(message: string): void;
  level: "info" | "warn" | "error"; // a union of string literals — very common in Angular
}
const consoleLogger: Logger = {
  level: "info",
  log(message) {
    console.log(`[${this.level}] ${message}`);
  },
};

// ---- 5. Index signatures: "any number of properties of this shape" ----
interface Dictionary {
  [key: string]: number;
}
const inventory: Dictionary = { widgets: 10, gadgets: 4 };
inventory.gizmos = 7; // fine — any string key maps to a number

// ---- 6. `interface` vs `type` — when to use which ----
// Both can describe object shapes. Rules of thumb:
//  - Use `interface` for objects/classes you expect might be extended
//    (e.g. an API model that might grow more specific subtypes).
//  - Use `type` when you need unions, tuples, or to alias a primitive/function
//    type — interfaces can't express `type Status = "on" | "off"`.
type Status = "on" | "off" | "unknown";

type Point = { x: number; y: number };       // type alias, same as an interface here
type Pair<T> = [T, T];                        // type aliases can do things interfaces can't

// A discriminated union: a very common, very powerful pattern.
type LoadingState = { kind: "loading" };
type SuccessState = { kind: "success"; data: string[] };
type ErrorState = { kind: "error"; message: string };
type RequestState = LoadingState | SuccessState | ErrorState;

function render(state: RequestState): string {
  switch (state.kind) {
    case "loading":
      return "Loading...";
    case "success":
      return `Got ${state.data.length} items`;
    case "error":
      return `Failed: ${state.message}`;
  }
}
console.log(render({ kind: "success", data: ["a", "b"] }));

console.log(add(1, 2));
consoleLogger.log("Playground running");

// ============================================================
// EXERCISE 1: Define an interface `Movie` with `title: string`, `year:
// number`, `rating?: number` (optional), and `readonly id: string`. Create
// two movie objects and put them in an array typed `Movie[]`.
// ============================================================

// EXERCISE 2: Create a discriminated union `Shape` = Circle | Rectangle,
// where Circle has `{ kind: "circle"; radius: number }` and Rectangle has
// `{ kind: "rectangle"; width: number; height: number }`. Write a function
// `area(shape: Shape): number` that switches on `kind` and computes the
// area correctly for each (this exact pattern — `kind`/`type` discriminator
// + switch — shows up everywhere in real Angular apps, e.g. NgRx actions).

// EXERCISE 3: Extend the `Logger` interface with an optional method
// `setLevel?(level: "info" | "warn" | "error"): void` and implement it on
// `consoleLogger`.
