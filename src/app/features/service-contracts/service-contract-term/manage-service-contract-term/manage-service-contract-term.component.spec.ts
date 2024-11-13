import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageServiceContractTermComponent } from './manage-service-contract-term.component';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ManageServiceContractTermComponent', () => {
  let component: ManageServiceContractTermComponent;
  let fixture: ComponentFixture<ManageServiceContractTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceContractTermComponent],
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
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock para MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: { term: 'Mock Term', months: 12 } }, // Mock para MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageServiceContractTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with data', () => {
    expect(component.termFormControl.value).toBe('Mock Term');
    expect(component.monthsFormControl.value).toBe(12);
  });
});
