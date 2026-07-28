# 0. Web Fundamentals Refresher

Angular sits on top of the regular web platform: HTML, CSS, and JavaScript.
Before diving into TypeScript and Angular, make sure these pieces are solid —
everything after this builds directly on them.

## HTML: structure

HTML describes *what's on the page*, not how it looks or behaves.

```html
<div class="card">
  <h2>Jeff's Profile</h2>
  <p>Location: Austin</p>
  <button>Follow</button>
</div>
```

Things worth being sure of:
- **Elements nest.** A `<div>` can contain other elements; indentation in your
  editor should reflect that nesting.
- **Attributes** configure an element: `class`, `id`, `href`, `src`, `type`,
  `disabled`, and so on. `<input type="email" disabled>`.
- **`id`** should be unique per page (used for one specific element).
  **`class`** can repeat (used to style/select groups of elements).
- Angular templates are HTML with a few extra pieces of syntax layered on
  (covered in Guide 2 onward) — so any HTML you already know transfers directly.

## CSS: presentation

CSS selects elements and assigns them style rules.

```css
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
.card h2 {
  color: #333;
  font-size: 1.25rem;
}
```

Selectors worth knowing:
- `.card` — selects by class
- `#header` — selects by id
- `.card h2` — selects an `h2` *inside* an element with class `card`
- `.card:hover` — a pseudo-class, applies only on hover
- `.btn.primary` — both classes on the same element

Layout: modern CSS layout is done with **Flexbox** (`display: flex`, one
axis at a time — a row or a column of items) and **Grid** (`display: grid`,
two axes at once). Angular's own styles don't change any of this — every
Angular component ships its own `.css` file that works exactly like this.

## JavaScript: behavior

This is the part that matters most before learning TypeScript, since
TypeScript *is* JavaScript with a type system on top. If any of this feels
shaky, spend real time here first.

### Variables

```js
let count = 0;       // can be reassigned
const name = "Jeff"; // cannot be reassigned (but object/array *contents* can still change)
```
Prefer `const` by default; use `let` only when you truly need to reassign.
Avoid `var` (older, function-scoped, easy to misuse).

### Functions

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b; // arrow function — same thing, shorter syntax
```
Arrow functions also handle `this` differently (they inherit it from the
surrounding scope rather than the caller) — this is exactly why Angular code
leans on arrow functions for callbacks, so it's worth internalizing now.

### Objects and arrays

```js
const user = { name: "Jeff", age: 31 };
console.log(user.name); // "Jeff"

const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);      // [2, 4, 6]
const evens = numbers.filter((n) => n % 2 === 0); // [2]
const sum = numbers.reduce((total, n) => total + n, 0); // 6
```
`.map`, `.filter`, and `.reduce` are the three array methods you'll use
constantly in Angular templates and components — make sure they're
comfortable before moving on.

### Destructuring and spread

```js
const { name, age } = user;         // pull fields out into variables
const [first, ...rest] = numbers;   // first = 1, rest = [2, 3]
const copy = { ...user, age: 32 };  // shallow copy with one field overridden
```
Angular code (especially with signals and reactive forms) uses spread syntax
constantly to produce new, updated copies of objects instead of mutating them.

### Template literals

```js
const greeting = `Hello, ${user.name}! You are ${user.age}.`;
```

### Modules (import/export)

```js
// math.js
export function add(a, b) { return a + b; }

// main.js
import { add } from './math.js';
```
Every Angular file is a module. You'll write `import { Component } from
'@angular/core';` at the top of essentially every file you touch.

### Promises and async/await

```js
function fetchUser(id) {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

async function loadUser(id) {
  const user = await fetchUser(id);
  console.log(user);
}
```
A `Promise` represents a value that will exist *later* (e.g. after a network
request finishes). `async`/`await` is just cleaner syntax for working with
promises. Angular's `HttpClient` (Guide 10) actually returns something called
an **Observable** instead of a Promise — similar idea, more powerful, and
explained in depth when we get there.

### The DOM (what the browser gives you)

In plain JavaScript you manipulate the page directly:

```js
document.querySelector('button').addEventListener('click', () => {
  document.querySelector('h1').textContent = 'Clicked!';
});
```

The entire point of Angular is that **you stop doing this by hand**. Instead
you declare, in the template, how the page should look for any given piece of
data, and Angular keeps the DOM in sync automatically. Guide 2 and 3 show
exactly how.

---

## Quick self-check

Before moving to `01-typescript-deep-dive.md`, you should be able to, without
looking anything up:
1. Write a function that takes an array of numbers and returns only the ones
   greater than 10, using `.filter`.
2. Explain the difference between `const` and `let`.
3. Destructure `{ name, age }` out of an object.
4. Write an `async` function that awaits a `fetch(...)` call and logs the
   parsed JSON.

If any of those feel uncertain, it's worth 30–60 minutes on a plain
JavaScript refresher (MDN's guides are excellent) before continuing — the
rest of this course assumes this part is comfortable.
