import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServicesComponent } from './all-services.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('AllServicesComponent', () => {
  let component: AllServicesComponent;
  let fixture: ComponentFixture<AllServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllServicesComponent],
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

    fixture = TestBed.createComponent(AllServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
