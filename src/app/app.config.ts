import {
  ApplicationConfig,
  ApplicationRef,
  inject,
  PLATFORM_ID,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { delay, first } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      const platform = inject(PLATFORM_ID);
      const appRef = inject(ApplicationRef);
      const isBrowser = isPlatformBrowser(platform);
      if (!isBrowser) return;
      const element = document.querySelector('h1');
      appRef.isStable.pipe(first(Boolean)).subscribe(() => {
        const elementHydrated = document.querySelector('h1');
        const isSame = element === elementHydrated;
        console.log({ element, elementHydrated, isSame });
      });
    }),
  ],
};
