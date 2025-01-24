import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSurveyQuestionsComponent } from './all-survey-questions.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('AllSurveyQuestionsComponent', () => {
  let component: AllSurveyQuestionsComponent;
  let fixture: ComponentFixture<AllSurveyQuestionsComponent>;

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
      imports: [AllSurveyQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllSurveyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
