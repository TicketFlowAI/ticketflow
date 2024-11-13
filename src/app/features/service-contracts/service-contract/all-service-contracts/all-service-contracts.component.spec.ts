import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceContractsComponent } from './all-service-contracts.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('AllServiceContractsComponent', () => {
  let component: AllServiceContractsComponent;
  let fixture: ComponentFixture<AllServiceContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServiceContractsComponent],
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

    fixture = TestBed.createComponent(AllServiceContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
