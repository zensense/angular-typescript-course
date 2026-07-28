# 7. Routing

Code: `../app/src/app/lessons/l06-routing/`
Route: `/l06-routing`

## The root route table

`../app/src/app/app.routes.ts` maps URL paths to components:
```ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'l01-components', component: HelloWorldComponent },
  ...
  {
    path: 'l06-routing',
    loadChildren: () => import('./lessons/l06-routing/l06-routing.routes').then((m) => m.L06_ROUTES),
  },
  { path: '**', redirectTo: '' }, // catch-all, must be last
];
```
`<router-outlet />` in `app.component.html` is where the matched component
actually renders.

## Lazy loading

`l06-routing` is loaded via `loadChildren` instead of a direct `component`
reference — Angular only downloads that feature's JavaScript the first time
a user actually navigates there. Run `ng build` in `../app` and you'll see
`l06-routing-routes` listed separately under "Lazy chunk files" rather than
bundled into the initial download. Every other lesson in this course is
eagerly loaded (imported directly) for simplicity, but in a real app you'd
lazy-load every top-level feature area the same way.

## Route parameters

```ts
{ path: 'products/:id', component: ProductDetailComponent }
```
```ts
// inside ProductDetailComponent
const id = Number(this.route.snapshot.paramMap.get('id'));
```
`ActivatedRoute` exposes everything about the currently matched route.
`.snapshot` is a point-in-time read — appropriate here because Angular
destroys and recreates this component each time `:id` changes (it's not the
same component instance navigating from product 1 to product 2). If you
needed the *same* instance to react to a changing param (e.g. a persistent
tab), you'd subscribe to `this.route.paramMap` (an Observable) instead.

## Navigation with `routerLink`

```html
<a [routerLink]="[product.id]">{{ product.name }}</a>
<a routerLink="../..">Back</a>
```
`[routerLink]="[...]"` takes an array of path segments relative to the
current route; a plain string like `"../.."` also supports relative
navigation, resolved the same way relative filesystem paths would be.

## Guards: `canDeactivate`

```ts
export const canLeaveGuard: CanDeactivateFn<ProductDetailComponent> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
```
```ts
{ path: 'products/:id', component: ProductDetailComponent, canDeactivate: [canLeaveGuard] }
```
This is a **functional guard** — a plain function, not an injectable class —
which is the modern (and simpler) style. Angular calls it before allowing
navigation *away* from a matched route; returning `false` blocks the
navigation. There's a matching family for blocking entry (`CanActivateFn`)
and controlling lazy-load access (`CanMatchFn`), all following the same
shape.

## Try it in the browser

Go to `/l06-routing/products/1`, edit the description, then click "Back to
products" *without* saving — you should see the confirm dialog from
`canLeaveGuard`.

## Try it yourself

Add a `canActivate` guard on the whole `l06-routing` route that always
returns `true` but logs "entering routing lesson" — confirm it fires in the
console every time you navigate here.
