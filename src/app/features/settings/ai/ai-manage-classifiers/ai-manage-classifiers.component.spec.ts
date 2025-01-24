import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiManageClassifiersComponent } from './ai-manage-classifiers.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { MatDialogRef } from '@angular/material/dialog';

describe('AiManageClassifiersComponent', () => {
  let component: AiManageClassifiersComponent;
  let fixture: ComponentFixture<AiManageClassifiersComponent>;

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
      imports: [AiManageClassifiersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiManageClassifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
