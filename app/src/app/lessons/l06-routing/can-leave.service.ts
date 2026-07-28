import { CanDeactivateFn } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

// A functional route guard (the modern Angular style — a plain function
// instead of an injectable class implementing CanDeactivate). Angular calls
// this before letting the user navigate AWAY from a component matched to a
// route that lists this guard. Returning `false` (or a confirm() result)
// blocks the navigation.
export const canLeaveGuard: CanDeactivateFn<ProductDetailComponent> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
