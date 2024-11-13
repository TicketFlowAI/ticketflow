import { TestBed } from '@angular/core/testing';

import { ServiceManagementService } from './service-management.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { isDevMode } from '@angular/core';

describe('ServiceManagement', () => {
  let service: ServiceManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
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
    });
    service = TestBed.inject(ServiceManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
