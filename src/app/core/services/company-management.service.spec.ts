import { TestBed } from '@angular/core/testing';

import { CompanyManagementService } from './company-management.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';

describe('CompanyManagementService', () => {
  let service: CompanyManagementService;

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
    service = TestBed.inject(CompanyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
