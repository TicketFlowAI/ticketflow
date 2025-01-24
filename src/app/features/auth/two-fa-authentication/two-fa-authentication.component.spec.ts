import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFaAuthenticationComponent } from './two-fa-authentication.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';

describe('TwoFaAuthenticationComponent', () => {
  let component: TwoFaAuthenticationComponent;
  let fixture: ComponentFixture<TwoFaAuthenticationComponent>;

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
      imports: [TwoFaAuthenticationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TwoFaAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
