import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmailTemplatesComponent } from './all-email-templates.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../../transloco-loader';

describe('AllEmailTemplatesComponent', () => {
  let component: AllEmailTemplatesComponent;
  let fixture: ComponentFixture<AllEmailTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEmailTemplatesComponent],
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

    fixture = TestBed.createComponent(AllEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
