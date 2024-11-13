import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageServiceContractComponent } from './manage-service-contract.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ManageServiceContractComponent', () => {
  let component: ManageServiceContractComponent;
  let fixture: ComponentFixture<ManageServiceContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServiceContractComponent],
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
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, company_id: 2, service_id: 3, service_term_id: 4 } }, // Mock para MAT_DIALOG_DATA
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageServiceContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from MAT_DIALOG_DATA', () => {
    expect(component.companyFormControl.value).toBe(2);
    expect(component.serviceFormControl.value).toBe(3);
    expect(component.serviceContactTermFormControl.value).toBe(4);
  });
});
