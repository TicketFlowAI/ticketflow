import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleInfoComponent } from './user-role-info.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UserRoleInfoComponent', () => {
  let component: UserRoleInfoComponent;
  let fixture: ComponentFixture<UserRoleInfoComponent>;

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
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
            backdropClick: jasmine.createSpy('backdropClick').and.returnValue(of()), // Mock añadido
          },
        },
      ],
      imports: [UserRoleInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
