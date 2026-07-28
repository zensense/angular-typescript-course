import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PRODUCTS, Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  draftDescription = '';
  private savedDescription = '';

  // ActivatedRoute exposes everything Angular knows about the *currently
  // matched* route: its parameters, query params, static data, etc.
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // `snapshot` is a point-in-time read of the route — perfect here because
    // this component is destroyed and recreated each time you navigate to a
    // different product (Angular doesn't reuse it across `:id` changes
    // unless you opt in). If you needed to react to the SAME component
    // instance's route changing (e.g. a tab that stays mounted), you'd
    // subscribe to `this.route.paramMap` instead of reading the snapshot once.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = PRODUCTS.find((p) => p.id === id);
    this.savedDescription = this.product?.description ?? '';
    this.draftDescription = this.savedDescription;
  }

  save(): void {
    if (this.product) {
      this.product.description = this.draftDescription;
      this.savedDescription = this.draftDescription;
    }
  }

  // Called by `canLeaveGuard` (can-leave.service.ts) before Angular allows
  // navigating away from this route.
  hasUnsavedChanges(): boolean {
    return this.draftDescription !== this.savedDescription;
  }
}
