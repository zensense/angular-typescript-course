import { Routes } from '@angular/router';
import { RoutingHomeComponent } from './routing-home/routing-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { canLeaveGuard } from './can-leave.service';

// This file is lazy-loaded from the root `app.routes.ts` via `loadChildren`.
// Angular only downloads this chunk of JS when the user actually navigates
// to `/l06-routing/...` — this is how real apps keep the initial bundle
// small as they grow. Everything else in this course is "eagerly" loaded
// (imported directly) for simplicity; in a real app you'd lazy-load every
// top-level feature area the same way this one is.
export const L06_ROUTES: Routes = [
  { path: '', component: RoutingHomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  // ':id' is a route parameter — matches /products/1, /products/2, etc.
  // ProductDetailComponent reads it via ActivatedRoute (see that file).
  { path: 'products/:id', component: ProductDetailComponent, canDeactivate: [canLeaveGuard] },
];
