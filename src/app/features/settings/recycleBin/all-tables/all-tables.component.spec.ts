import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTablesComponent } from './all-tables.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('AllTablesComponent', () => {
  let component: AllTablesComponent;
  let fixture: ComponentFixture<AllTablesComponent>;

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
        { provide: MatDialogRef, useValue: {} }, // Mock para MatDialogRef
      ],
      imports: [AllTablesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
