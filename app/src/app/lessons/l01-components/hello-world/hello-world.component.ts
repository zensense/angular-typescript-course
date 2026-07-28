import { Component } from '@angular/core';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

// The @Component decorator turns a plain class into an Angular component:
// - `selector` is the custom HTML tag other templates use to place it.
// - `standalone: true` means this component declares its own dependencies
//   (via `imports`) instead of belonging to an NgModule. This has been the
//   default and recommended style since Angular 17 — you likely won't need
//   to learn NgModules at all for new code, though you'll still see them in
//   older Angular codebases.
// - `templateUrl`/`styleUrl` point at the HTML/CSS files that make up its view.
@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [ProfileCardComponent], // any component/directive/pipe used in the template must be listed here
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css',
})
export class HelloWorldComponent {
  courseTitle = 'Angular + TypeScript';
  // Data can be as simple as a primitive or as rich as an array of objects —
  // whatever it is, it's just a normal TypeScript property on the class.
  team = [
    { name: 'Jeff', role: 'Learning Angular', avatarEmoji: '🧑‍💻' },
    { name: 'Ada', role: 'Course Mascot', avatarEmoji: '🤖' },
  ];
}
