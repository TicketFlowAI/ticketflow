import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmailIntervalComponent } from './manage-email-interval.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../../transloco-loader';

describe('ManageEmailIntervalComponent', () => {
  let component: ManageEmailIntervalComponent;
  let fixture: ComponentFixture<ManageEmailIntervalComponent>;

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
      imports: [ManageEmailIntervalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageEmailIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
