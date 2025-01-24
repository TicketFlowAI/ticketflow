import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmailIntervalsComponent } from './all-email-intervals.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../../transloco-loader';

describe('AllEmailIntervalsComponent', () => {
  let component: AllEmailIntervalsComponent;
  let fixture: ComponentFixture<AllEmailIntervalsComponent>;

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
        })
      ],
      imports: [AllEmailIntervalsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllEmailIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
