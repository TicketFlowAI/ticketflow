import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionSurveyInfoComponent } from './satisfaction-survey-info.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('SatisfactionSurveyInfoComponent', () => {
  let component: SatisfactionSurveyInfoComponent;
  let fixture: ComponentFixture<SatisfactionSurveyInfoComponent>;

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
      imports: [SatisfactionSurveyInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionSurveyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
