import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageServiceComponent } from './manage-service.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { of } from 'rxjs';
import { ServiceModel } from '../../../../core/models/entities/service.model';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';
import { ServiceTaxModel } from '../../../../core/models/entities/service-tax.model';

// Archivo de pruebas para ManageServiceComponent
describe('ManageServiceComponent', () => {
  let component: ManageServiceComponent;
  let fixture: ComponentFixture<ManageServiceComponent>;
  let serviceManagementServiceSpy: jasmine.SpyObj<ServiceManagementService>;

  beforeEach(async () => {
    const mockServiceManagementService = jasmine.createSpyObj('ServiceManagementService', [
      'getAllServiceCategories',
      'getAllServiceTaxes',
      'editService',
      'addService'
    ]);

    mockServiceManagementService.getAllServiceCategories.and.returnValue(of([
      new ServiceCategoryModel(1, 'Test Category'),
    ]));
    mockServiceManagementService.getAllServiceTaxes.and.returnValue(of([
      new ServiceTaxModel(1, 'Test Tax', 10),
    ]));

    await TestBed.configureTestingModule({
      imports: [ManageServiceComponent],
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
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new ServiceModel(1, 'Test Service', 'Test Details', 1, 1, 100, 'Test Category', 'Test Tax'),
        },
        { provide: ServiceManagementService, useValue: mockServiceManagementService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageServiceComponent);
    component = fixture.componentInstance;
    serviceManagementServiceSpy = TestBed.inject(ServiceManagementService) as jasmine.SpyObj<ServiceManagementService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize service data from MAT_DIALOG_DATA', () => {
    const service = component.serviceData;
    expect(service).toBeTruthy();
    expect(service?.id).toBe(1);
    expect(service?.description).toBe('Test Service');
    expect(service?.details).toBe('Test Details');
    expect(service?.category_id).toBe(1);
    expect(service?.tax_id).toBe(1);
    expect(service?.price).toBe(100);
  });

  it('should fetch categories and taxes on initialization', () => {
    expect(serviceManagementServiceSpy.getAllServiceCategories).toHaveBeenCalled();
    expect(serviceManagementServiceSpy.getAllServiceTaxes).toHaveBeenCalled();
    expect(component.categories).toEqual([new ServiceCategoryModel(1, 'Test Category')]);
    expect(component.taxes).toEqual([new ServiceTaxModel(1, 'Test Tax', 10)]);
  });

  it('should call addService when no serviceData is provided', () => {
    component.serviceData = null;
    const newService = new ServiceModel(0, 'New Service', 'New Details', 1, 1, 100, 'Category', 'Tax');
    component.serviceForm.setValue({
      description: 'New Service',
      details: 'New Details',
      price: 100,
      category: 1,
      tax: 1,
    });
    component.onSaveClick();
    expect(serviceManagementServiceSpy.addService).toHaveBeenCalledWith(newService);
  });

  it('should call editService when serviceData is provided', () => {
    const updatedService = new ServiceModel(1, 'Updated Service', 'Updated Details', 1, 1, 200, 'Updated Category', 'Updated Tax');
    component.serviceForm.setValue({
      description: 'Updated Service',
      details: 'Updated Details',
      price: 200,
      category: 1,
      tax: 1,
    });
    component.onSaveClick();
    expect(serviceManagementServiceSpy.editService).toHaveBeenCalledWith(updatedService);
  });

  it('should disable save button if form is invalid', () => {
    component.serviceForm.setValue({
      description: '',
      details: '',
      price: 0,
      category: 0,
      tax: 0,
    });
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('button[cdkFocusInitial]');
    expect(saveButton.disabled).toBeTrue();
  });

  it('should enable save button if form is valid', () => {
    component.serviceForm.setValue({
      description: 'Valid Service',
      details: 'Valid Details',
      price: 100,
      category: 1,
      tax: 1,
    });
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector('button[cdkFocusInitial]');
    expect(saveButton.disabled).toBeFalse();
  });
});