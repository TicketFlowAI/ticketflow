import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceContractTermsComponent } from './all-service-contract-terms.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('AllServiceContractTermsComponent', () => {
  let component: AllServiceContractTermsComponent;
  let fixture: ComponentFixture<AllServiceContractTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServiceContractTermsComponent],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllServiceContractTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
