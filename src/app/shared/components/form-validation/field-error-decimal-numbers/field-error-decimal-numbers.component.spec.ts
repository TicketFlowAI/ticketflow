import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorDecimalNumbersComponent } from './field-error-decimal-numbers.component';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';

describe('FieldErrorDecimalNumbersComponent', () => {
  let component: FieldErrorDecimalNumbersComponent;
  let fixture: ComponentFixture<FieldErrorDecimalNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      ],
      imports: [FieldErrorDecimalNumbersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FieldErrorDecimalNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
