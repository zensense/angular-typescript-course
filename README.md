# Angular + TypeScript, Start to Finish

A hands-on course: plain TypeScript first, then a real, runnable Angular 18
project with one lesson per Angular concept, ending in a small capstone app.

## Structure

```
angular-typescript-course/
├── GUIDE/              14 markdown chapters — read alongside the code
├── ts-playground/      standalone TypeScript exercises, no Angular needed
└── app/                the Angular project — every lesson is a real route
```

## Suggested path

1. **`GUIDE/00-web-fundamentals.md`** — skip this if HTML/CSS/JS already
   feel solid; read it first if they don't. Everything after assumes it.
2. **`ts-playground/`** + **`GUIDE/01-typescript-deep-dive.md`** — learn
   TypeScript on its own, with no Angular concepts mixed in yet.
3. **`app/`** + **`GUIDE/02` through `13`** — one chapter, one route, in
   order. Each chapter names the exact files to open.

## Getting the Angular app running

Requires [Node.js](https://nodejs.org) 18+ (this was built and tested against
Node 22 / Angular 18).

```
cd app
npm install
npm start
```
Then open **http://localhost:4200** — the homepage links to every lesson.

Other useful commands, run from inside `app/`:
```
npm run build   # production build, output in app/dist/
npm test        # unit tests (Jasmine/Karma) — needs a browser installed
```

## Why this order

Web fundamentals → TypeScript → Angular is deliberate: Angular is written in
TypeScript and leans on it constantly (decorators, generics, interfaces for
every API shape), and TypeScript in turn is just JavaScript with types
layered on. Skipping ahead tends to mean re-learning the same concept twice
— once fighting Angular's syntax, once fighting the language underneath it.
Each Angular lesson's `GUIDE` chapter explicitly calls back to the
TypeScript/JS concept it depends on, so if something feels unfamiliar it's
easy to trace back to where it was actually introduced.

## What's covered

Components & templates, all four data-binding forms, directives & pipes
(both the modern `@if`/`@for` syntax and the classic `*ngIf`/`*ngFor`),
parent/child communication, services & dependency injection, routing
(including lazy loading, route params, and guards), template-driven and
Reactive Forms, HTTP + RxJS (against a real public API), signals, unit
testing, and a capstone task-manager app combining all of it.

Everything here reflects modern Angular (standalone components, the new
control-flow syntax, signals, functional guards, `inject()`) — the current
recommended way to write Angular, not the NgModule-based style of older
tutorials you may run into elsewhere.
