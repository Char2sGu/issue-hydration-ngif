import { AsyncPipe, NgIf } from '@angular/common';
import { pendingUntilEvent } from '@angular/core/rxjs-interop';
import { Component } from '@angular/core';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly post$ = timer(1000).pipe(
    map(() => ({
      title: 'Hello, World!',
      body: 'Lorem Ipsum',
    })),
    pendingUntilEvent()
  );
}
