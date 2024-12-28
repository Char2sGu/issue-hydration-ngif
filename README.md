# IssueHydrationNgif

`app.component.html` contains two versions of the same code, one with the legacy `ngIf` directive and one with the new built-in control flow.

The built-in control flow can handle hydration perfectly. The else block is ignored during hydration and thus the then block is correctly hydrated:

```html
@if (post$ | async; as post) {
<h1>{{ post.title }}</h1>
<p>{{ post.body }}</p>
} @else {
<span>Empty</span>
}
```

The legacy `ngIf` directive renders the else block during hydration and then render back the then block, causing the elements to change and thus resulting in a flicker.

```html
<ng-container *ngIf="post$ | async as post; else empty">
  <h1>{{ post.title }}</h1>
  <p>{{ post.body }}</p>
</ng-container>
<ng-template #empty>
  <span>Empty</span>
</ng-template>
```
