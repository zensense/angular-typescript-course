import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
})
export class ProfileCardComponent {
  // @Input() marks a property as settable from OUTSIDE this component, via
  // an attribute on its selector, e.g. <app-profile-card [name]="...">.
  // This is how data flows from a parent component down into a child.
  @Input() name = '';
  @Input() role = '';
  @Input() avatarEmoji = '🙂';
}
