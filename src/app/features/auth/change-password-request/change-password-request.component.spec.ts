import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordRequestComponent } from './change-password-request.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../transloco-loader';

describe('ChangePasswordRequestComponent', () => {
  let component: ChangePasswordRequestComponent;
  let fixture: ComponentFixture<ChangePasswordRequestComponent>;

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
      imports: [ChangePasswordRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
