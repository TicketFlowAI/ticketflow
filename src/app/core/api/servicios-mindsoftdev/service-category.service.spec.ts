import { TestBed } from '@angular/core/testing';

import { ServiceCategoryService } from './service-category.service';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServiceCategoryService', () => {
  let service: ServiceCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ServiceCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
