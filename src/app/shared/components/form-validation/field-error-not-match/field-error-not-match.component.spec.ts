import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorNotMatchComponent } from './field-error-not-match.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('FieldErrorNotMatchComponent', () => {
  let component: FieldErrorNotMatchComponent;
  let fixture: ComponentFixture<FieldErrorNotMatchComponent>;

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
      imports: [FieldErrorNotMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldErrorNotMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
