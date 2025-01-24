import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionSurveyComponent } from './satisfaction-survey.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('SatisfactionSurveyComponent', () => {
  let component: SatisfactionSurveyComponent;
  let fixture: ComponentFixture<SatisfactionSurveyComponent>;

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
      imports: [SatisfactionSurveyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SatisfactionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
