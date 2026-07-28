import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Post, PostsService } from '../posts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-http-demo',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './http-demo.component.html',
  styleUrl: './http-demo.component.css',
})
export class HttpDemoComponent implements OnInit {
  // `posts$` (the trailing `$` is just a naming convention, not special
  // syntax) is an Observable, not an array. The template subscribes to it
  // with the `| async` pipe, which also automatically unsubscribes when
  // this component is destroyed — you rarely call `.subscribe()` by hand in
  // a template-facing property for exactly this reason.
  posts$!: Observable<Post[]>;

  selectedPost?: Post;
  loadingPost = false;

  // A Subject is both an Observable AND something you can push values into
  // manually (`.next(value)`) — useful for turning imperative events (like
  // "the user typed something") into a stream you can pipe operators over.
  private postIdInput$ = new Subject<string>();

  constructor(private postsService: PostsService) {
    // switchMap: whenever a NEW id comes in, cancel any in-flight request
    // for the previous id and switch to a new one. debounceTime +
    // distinctUntilChanged keep this from firing on every keystroke.
    this.postIdInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((idStr) => {
          this.loadingPost = true;
          const id = Number(idStr) || 1;
          return this.postsService.getPost(id);
        }),
      )
      .subscribe((post) => {
        this.selectedPost = post;
        this.loadingPost = false;
      });
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPostsSafely();
  }

  onIdInput(value: string): void {
    this.postIdInput$.next(value);
  }
}
