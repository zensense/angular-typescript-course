import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-routing-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './routing-home.component.html',
})
export class RoutingHomeComponent {}
