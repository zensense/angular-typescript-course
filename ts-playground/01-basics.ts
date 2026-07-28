// ============================================================
// 01 — TypeScript Basics: types, inference, arrays, tuples, enums, functions
// ============================================================
// TypeScript is JavaScript + a type system that's checked *before* your code
// runs (at compile time). It compiles down to plain JS — the types
// themselves disappear; they only exist to catch mistakes early and to give
// your editor autocomplete.

// ---- 1. Explicit types vs inference ----
let city: string = "Austin";     // explicit type annotation
let count = 42;                  // TS infers `count: number` automatically
let isActive = true;             // inferred `boolean`

// Try this in your editor: hover over `count`. It shows `let count: number`.
// TS inferred it from the value you assigned. You don't need to annotate
// every variable — only when TS can't figure it out on its own (e.g. function
// parameters, or a variable declared without an initial value).

// ---- 2. The basic types ----
let age: number = 31;
let name_: string = "Jeff";
let active: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// `any` disables type checking entirely for that value — avoid it.
// eslint-disable-next-line
let anything: any = "start as a string";
anything = 5; // no error, because `any` opted out of checking. Don't do this.

// `unknown` is the safe version of `any`: you must narrow it before use.
let mystery: unknown = "could be anything";
if (typeof mystery === "string") {
  console.log(mystery.toUpperCase()); // OK — TS knows it's a string here
}

// ---- 3. Arrays and tuples ----
let scores: number[] = [10, 20, 30];        // array of numbers
let names: Array<string> = ["Ann", "Bo"];   // equivalent generic syntax

// A tuple is a *fixed-length, fixed-type-per-slot* array — useful for
// pairs/triples where position has meaning (e.g. [key, value]).
let point: [number, number] = [10, 20];
let entry: [string, number] = ["temperature", 98.6];

// ---- 4. Enums: a named set of constants ----
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
  Cancelled,
}
let orderStatus: OrderStatus = OrderStatus.Shipped;
console.log("Order status:", OrderStatus[orderStatus]); // "Shipped"

// String enums are often clearer to debug (the value IS the name):
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
console.log(Direction.Up); // "UP"

// ---- 5. Functions: typed parameters and return values ----
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameter (must come after required ones) — marked with `?`
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}
console.log(greet("Jeff"));            // "Hello, Jeff!"
console.log(greet("Jeff", "Hey"));     // "Hey, Jeff!"

// Default parameter value (TS infers the type from the default)
function power(base: number, exponent = 2): number {
  return Math.pow(base, exponent);
}

// Arrow function with explicit types — this is the style you'll use
// constantly in Angular components.
const multiply = (a: number, b: number): number => a * b;

// `void` — function returns nothing meaningful
function logMessage(msg: string): void {
  console.log(msg);
}

// `never` — function never returns at all (always throws, or infinite loop)
function fail(message: string): never {
  throw new Error(message);
}

// ---- 6. Union types: "this OR that" ----
function formatId(id: string | number): string {
  return `ID-${id}`;
}
console.log(formatId(42));
console.log(formatId("abc"));

// ---- 7. Type aliases: give a type a reusable name ----
type ID = string | number;
function printId(id: ID) {
  console.log("Printing id:", id);
}

console.log(add(2, 3), multiply(4, 5), power(2, 10));

// ============================================================
// EXERCISE 1: Write a function `average(nums: number[]): number` that
// returns the mean of an array of numbers. Type every parameter and the
// return value explicitly (don't rely on inference here — practice writing
// the annotation).
// ============================================================

// EXERCISE 2: Create a string enum `TrafficLight` with values Red, Yellow,
// Green. Write a function `nextLight(current: TrafficLight): TrafficLight`
// that returns the next light in the cycle (Red -> Green -> Yellow -> Red).

// EXERCISE 3: `unknown` vs `any` — write a function `safeLength(value:
// unknown): number` that returns the `.length` of `value` if it's a string
// or an array, and 0 otherwise. You'll need `typeof` and `Array.isArray()`
// checks to narrow `unknown` down before touching `.length`.
