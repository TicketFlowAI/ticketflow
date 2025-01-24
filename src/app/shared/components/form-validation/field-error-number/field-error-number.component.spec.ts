import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorNumberComponent } from './field-error-number.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('FieldErrorNumberComponent', () => {
  let component: FieldErrorNumberComponent;
  let fixture: ComponentFixture<FieldErrorNumberComponent>;

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
      imports: [FieldErrorNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
