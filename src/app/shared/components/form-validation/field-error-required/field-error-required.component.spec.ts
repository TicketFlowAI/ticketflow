import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorRequiredComponent } from './field-error-required.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('FieldErrorRequiredComponent', () => {
  let component: FieldErrorRequiredComponent;
  let fixture: ComponentFixture<FieldErrorRequiredComponent>;

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
      imports: [FieldErrorRequiredComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FieldErrorRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
