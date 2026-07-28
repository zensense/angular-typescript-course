# TypeScript Playground

Standalone TypeScript files with **no Angular** — just the language itself.
Work through them in order (01 → 05). Each file compiles and runs on its own.

## Setup

```
cd ts-playground
npm install
```

## Running a file

Two options:

```
# One-off, no npm scripts needed:
npx tsc 01-basics.ts --outDir dist && node dist/01-basics.js

# Or use the provided script:
npm run run:01
```

Every file has `// EXERCISE:` comments. Do those before moving to the next
file — that's where the actual learning happens, not in reading the examples.

## Files

1. `01-basics.ts` — primitives, inference, arrays, tuples, enums, functions
2. `02-interfaces-types.ts` — interfaces, type aliases, optional/readonly, index signatures
3. `03-classes.ts` — classes, access modifiers, abstract classes, interfaces on classes
4. `04-generics.ts` — generic functions/classes, constraints
5. `05-advanced-types.ts` — union narrowing, utility types, mapped types, decorators

Once you're comfortable here, move to `../app` (the Angular project) — everything
you just learned shows up immediately in real component code.
