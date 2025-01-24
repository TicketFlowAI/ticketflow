import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorIntegerNumbersComponent } from './field-error-integer-numbers.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('FieldErrorIntegerNumbersComponent', () => {
  let component: FieldErrorIntegerNumbersComponent;
  let fixture: ComponentFixture<FieldErrorIntegerNumbersComponent>;

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
      imports: [FieldErrorIntegerNumbersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FieldErrorIntegerNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
