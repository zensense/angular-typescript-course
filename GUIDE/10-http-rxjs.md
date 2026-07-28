# 10. HTTP & RxJS

Code: `../app/src/app/lessons/l09-http-rxjs/`
Route: `/l09-http-rxjs`

This lesson makes real network calls to
[JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake REST API
— you need an internet connection for it to work, but nothing to sign up for.

## `HttpClient` returns Observables, not Promises

```ts
constructor(private http: HttpClient) {}

getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.baseUrl}/posts?_limit=5`);
}
```
Nothing happens until something **subscribes**. This is a fundamentally
different model from `fetch()` + a Promise: an Observable is a *description*
of a stream of future values, and can represent zero, one, or many values
over time (a click stream, a WebSocket, form value changes) — a Promise can
only ever resolve once. `provideHttpClient()` in `app.config.ts` is what
makes `HttpClient` injectable throughout the app.

## The `async` pipe: the idiomatic way to consume an Observable in a template

```ts
posts$!: Observable<Post[]>;
ngOnInit(): void { this.posts$ = this.postsService.getPostsSafely(); }
```
```html
@for (post of (posts$ | async); track post.id) {
  <li>{{ post.title }}</li>
} @empty {
  <li>Loading posts…</li>
}
```
`| async` subscribes to the Observable, unwraps each emitted value for the
template, **and automatically unsubscribes when the component is
destroyed** — this last part matters: manually-managed subscriptions that
never unsubscribe are one of the most common sources of memory leaks in
real Angular apps. Prefer `| async` over calling `.subscribe()` yourself
whenever the value is only needed in the template.

## Operators: `.pipe(...)`

Operators transform the stream without touching the original Observable.
```ts
getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(url).pipe(
    retry(1),           // retry once on failure before giving up
    shareReplay(1),     // cache the last emission for late subscribers
  );
}

getPostTitles(): Observable<string[]> {
  return this.getPosts().pipe(map((posts) => posts.map((p) => p.title)));
}

getPostsSafely(): Observable<Post[]> {
  return this.getPosts().pipe(catchError(() => of([]))); // recover instead of propagating the error
}
```

## Turning user input into a stream: `Subject` + `switchMap`

```ts
private postIdInput$ = new Subject<string>();

constructor(private postsService: PostsService) {
  this.postIdInput$.pipe(
    debounceTime(300),          // wait for typing to pause
    distinctUntilChanged(),     // skip if the value didn't actually change
    switchMap((idStr) => this.postsService.getPost(Number(idStr) || 1)),
  ).subscribe((post) => { this.selectedPost = post; });
}

onIdInput(value: string): void {
  this.postIdInput$.next(value);
}
```
`switchMap` is the key operator here: whenever a **new** id arrives, it
cancels any in-flight request for the previous id and switches to a new one
— exactly the behavior you want for a type-ahead search or lookup field, so
a slow response for an old query can never overwrite a newer one.

## Try it yourself

Add a "retry" button that re-assigns `posts$` from a new call to
`getPostsSafely()`, and watch a fresh request fire in your browser's Network tab.
