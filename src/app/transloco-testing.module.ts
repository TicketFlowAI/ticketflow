import {
    TranslocoTestingModule,
    TranslocoTestingOptions,
} from '@jsverse/transloco';
import en from '../../public/i18n/en.json';
import es from '../../public/i18n/es.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
    return TranslocoTestingModule.forRoot({
        langs: { en, es }, 
        translocoConfig: {
            availableLangs: ['en', 'es'], 
            defaultLang: 'en',
        },
        preloadLangs: true, 
        ...options,
    });
}