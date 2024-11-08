import {ApplicationConfig, provideExperimentalZonelessChangeDetection, isDevMode} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {TranslocoHttpLoader} from './transloco-loader';
import {provideTransloco} from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
    provideTransloco({
      config: {
        availableLangs: ['es', 'en'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
  ]
};
