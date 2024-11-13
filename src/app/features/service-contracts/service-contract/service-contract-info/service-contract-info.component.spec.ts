import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceContractInfoComponent } from './service-contract-info.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceContractModel } from '../../../../core/models/entities/service-contract.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';

describe('ServiceContractInfoComponent', () => {
  let component: ServiceContractInfoComponent;
  let fixture: ComponentFixture<ServiceContractInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceContractInfoComponent],
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
          loader: TranslocoHttpLoader
        }),
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock de MatDialogRef
        {
          provide: MAT_DIALOG_DATA,
          useValue: new ServiceContractModel(
            1,
            2,
            3,
            4,
            'Test Company',
            'Test Service',
            'Test Service Term',
            1000
          ), // Mock completo para MAT_DIALOG_DATA
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceContractInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize serviceContract data from MAT_DIALOG_DATA', () => {
    expect(component.serviceContract.id).toBe(1);
    expect(component.serviceContract.company_id).toBe(2);
    expect(component.serviceContract.service_id).toBe(3);
    expect(component.serviceContract.service_term_id).toBe(4);
    expect(component.serviceContract.company).toBe('Test Company');
    expect(component.serviceContract.service).toBe('Test Service');
    expect(component.serviceContract.service_term).toBe('Test Service Term');
    expect(component.serviceContract.price).toBe(1000);
  });

  it('should close the dialog on return click', () => {
    component.onReturnClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
