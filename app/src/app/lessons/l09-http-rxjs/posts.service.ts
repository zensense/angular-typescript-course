import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, retry, shareReplay } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // JSONPlaceholder is a free fake REST API — perfect for practicing HTTP
  // calls without needing your own backend.
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // HttpClient.get<T>() returns an Observable<T> — NOT the data itself, and
  // NOT a Promise. Nothing happens until something subscribes to it (see
  // http-demo.component.ts, or the `| async` pipe in its template).
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts?_limit=5`).pipe(
      retry(1), // retry once on failure (flaky network) before giving up
      shareReplay(1), // cache the last emission for any late subscribers
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  // `.pipe()` chains RxJS "operators" — functions that transform the stream
  // of values flowing through the Observable, without touching the original.
  getPostTitles(): Observable<string[]> {
    return this.getPosts().pipe(map((posts) => posts.map((p) => p.title)));
  }

  // `catchError` lets you recover from a failed request instead of letting
  // the error propagate — here we fall back to an empty array.
  getPostsSafely(): Observable<Post[]> {
    return this.getPosts().pipe(
      catchError((err) => {
        console.error('Failed to load posts', err);
        return of([]);
      }),
    );
  }
}
