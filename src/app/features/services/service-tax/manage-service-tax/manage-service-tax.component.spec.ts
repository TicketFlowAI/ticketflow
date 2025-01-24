import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageServiceTaxComponent } from './manage-service-tax.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { of } from 'rxjs';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';

describe('ManageServiceTaxComponent', () => {
  let component: ManageServiceTaxComponent;
  let fixture: ComponentFixture<ManageServiceTaxComponent>;
  let serviceManagementServiceSpy: jasmine.SpyObj<ServiceManagementService>;

  beforeEach(async () => {
    const mockServiceManagementService = jasmine.createSpyObj('ServiceManagementService', [
      'editServiceTax',
      'addServiceTax',
    ]);

    mockServiceManagementService.editServiceTax.and.returnValue(of(null));
    mockServiceManagementService.addServiceTax.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [ManageServiceTaxComponent],
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
        {
          provide: MAT_DIALOG_DATA,
          useValue: new ServiceTaxModel(1, 'Test Tax', 15), // Mock de MAT_DIALOG_DATA
        },
        { provide: ServiceManagementService, useValue: mockServiceManagementService }, // Mock de ServiceManagementService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageServiceTaxComponent);
    component = fixture.componentInstance;
    serviceManagementServiceSpy = TestBed.inject(ServiceManagementService) as jasmine.SpyObj<ServiceManagementService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize serviceTaxData from MAT_DIALOG_DATA', () => {
    const serviceTax = component.serviceTax;
    expect(serviceTax).toBeTruthy();
    expect(serviceTax?.id).toBe(1);
    expect(serviceTax?.description).toBe('Test Tax');
    expect(serviceTax?.value).toBe(15);
  });

  it('should call editServiceTax and close dialog on save for existing service tax', () => {
    component.onSaveClick();
    expect(serviceManagementServiceSpy.editServiceTax).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call addServiceTax and close dialog on save for new service tax', () => {
    component.serviceTaxData = null;
    component.taxDescriptionFormControl.setValue('New Tax');
    component.taxValueFormControl.setValue(10);
    component.onSaveClick();
    expect(serviceManagementServiceSpy.addServiceTax).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
