import { Routes } from '@angular/router';
import { HomeComponent } from './lessons/home/home.component';
import { HelloWorldComponent } from './lessons/l01-components/hello-world/hello-world.component';
import { BindingDemoComponent } from './lessons/l02-data-binding/binding-demo/binding-demo.component';
import { DirectivesDemoComponent } from './lessons/l03-directives-pipes/directives-demo/directives-demo.component';
import { ParentDemoComponent } from './lessons/l04-communication/parent-demo/parent-demo.component';
import { ServicesDemoComponent } from './lessons/l05-services/services-demo/services-demo.component';
import { SignupFormComponent } from './lessons/l07-template-forms/signup-form/signup-form.component';
import { ReactiveSignupComponent } from './lessons/l08-reactive-forms/reactive-signup/reactive-signup.component';
import { HttpDemoComponent } from './lessons/l09-http-rxjs/http-demo/http-demo.component';
import { TodoAppComponent } from './lessons/l10-signals/todo-app/todo-app.component';
import { TaskListComponent } from './capstone/task-list/task-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Angular + TypeScript Course' },
  { path: 'l01-components', component: HelloWorldComponent, title: 'Lesson 1: Components' },
  { path: 'l02-data-binding', component: BindingDemoComponent, title: 'Lesson 2: Data Binding' },
  { path: 'l03-directives-pipes', component: DirectivesDemoComponent, title: 'Lesson 3: Directives & Pipes' },
  { path: 'l04-communication', component: ParentDemoComponent, title: 'Lesson 4: Component Communication' },
  { path: 'l05-services', component: ServicesDemoComponent, title: 'Lesson 5: Services & DI' },
  {
    path: 'l06-routing',
    title: 'Lesson 6: Routing',
    loadChildren: () => import('./lessons/l06-routing/l06-routing.routes').then((m) => m.L06_ROUTES),
  },
  { path: 'l07-template-forms', component: SignupFormComponent, title: 'Lesson 7: Template-Driven Forms' },
  { path: 'l08-reactive-forms', component: ReactiveSignupComponent, title: 'Lesson 8: Reactive Forms' },
  { path: 'l09-http-rxjs', component: HttpDemoComponent, title: 'Lesson 9: HTTP & RxJS' },
  { path: 'l10-signals', component: TodoAppComponent, title: 'Lesson 10: Signals & State' },
  { path: 'capstone', component: TaskListComponent, title: 'Capstone: Task Manager' },
  { path: '**', redirectTo: '' },
];
