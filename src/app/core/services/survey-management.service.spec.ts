import { TestBed } from '@angular/core/testing';

import { SurveyManagementService } from './survey-management.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../transloco-loader';

describe('SurveyManagementService', () => {
  let service: SurveyManagementService;

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
          loader: TranslocoHttpLoader,
        }),
      ]
    });
    service = TestBed.inject(SurveyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
