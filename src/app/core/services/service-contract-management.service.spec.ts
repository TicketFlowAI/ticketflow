import { TestBed } from '@angular/core/testing';

import { ServiceContractManagementService } from './service-contract-management.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';

describe('ServiceContractManagerService', () => {
  let service: ServiceContractManagementService;

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
    service = TestBed.inject(ServiceContractManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
