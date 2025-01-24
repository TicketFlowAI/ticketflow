import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorRequiredSelectComponent } from './field-error-required-select.component';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';

describe('FieldErrorRequiredSelectComponent', () => {
  let component: FieldErrorRequiredSelectComponent;
  let fixture: ComponentFixture<FieldErrorRequiredSelectComponent>;

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
      imports: [FieldErrorRequiredSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FieldErrorRequiredSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
