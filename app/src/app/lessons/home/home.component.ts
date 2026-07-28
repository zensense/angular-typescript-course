import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Lesson {
  path: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // A plain TypeScript array of interfaces — rendered below with the modern
  // `@for` control-flow syntax (Angular 17+). See Guide 3 for the older
  // `*ngFor` structural-directive syntax you'll still see in most existing
  // codebases; both do the same thing.
  lessons: Lesson[] = [
    { path: '/l01-components', title: '1. Components & Templates', description: 'Your first components, inputs, and template syntax.' },
    { path: '/l02-data-binding', title: '2. Data Binding', description: 'Interpolation, property/event/two-way binding.' },
    { path: '/l03-directives-pipes', title: '3. Directives & Pipes', description: '*ngIf/*ngFor vs @if/@for, custom pipes and directives.' },
    { path: '/l04-communication', title: '4. Component Communication', description: '@Input, @Output, and parent/child data flow.' },
    { path: '/l05-services', title: '5. Services & Dependency Injection', description: 'Sharing logic and state across components.' },
    { path: '/l06-routing', title: '6. Routing', description: 'Routes, route params, nested routes, guards.' },
    { path: '/l07-template-forms', title: '7. Template-Driven Forms', description: 'ngModel-based forms and validation.' },
    { path: '/l08-reactive-forms', title: '8. Reactive Forms', description: 'FormGroup/FormControl, typed forms, validators.' },
    { path: '/l09-http-rxjs', title: '9. HTTP & RxJS', description: 'HttpClient, Observables, operators, async pipe.' },
    { path: '/l10-signals', title: '10. Signals & State', description: "Angular's modern reactivity primitive." },
    { path: '/capstone', title: '11. Capstone: Task Manager', description: 'Everything above, combined into one small app.' },
  ];
}
