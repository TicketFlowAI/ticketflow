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

describe('ManageServiceComponent', () => {
  let component: ManageServiceComponent;
  let fixture: ComponentFixture<ManageServiceComponent>;
  let serviceManagementServiceSpy: jasmine.SpyObj<ServiceManagementService>;

  beforeEach(async () => {
    const mockServiceManagementService = jasmine.createSpyObj('ServiceManagementService', [
      'getAllServiceCategories',
      'getAllServiceTaxes',
      'editService',
      'addService',
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
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock para MatDialogRef
        {
          provide: MAT_DIALOG_DATA,
          useValue: new ServiceModel(1, 'Test Service', 1, 1, 100, 'Test Category', 'Test Tax'),
        }, // Mock para MAT_DIALOG_DATA
        { provide: ServiceManagementService, useValue: mockServiceManagementService }, // Mock para ServiceManagementService
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
    expect(service.id).toBe(1);
    expect(service.description).toBe('Test Service');
    expect(service.category_id).toBe(1);
    expect(service.tax_id).toBe(1);
    expect(service.price).toBe(100);
  });

  it('should fetch categories and taxes on initialization', () => {
    expect(serviceManagementServiceSpy.getAllServiceCategories).toHaveBeenCalled();
    expect(serviceManagementServiceSpy.getAllServiceTaxes).toHaveBeenCalled();
    expect(component.categories).toEqual([new ServiceCategoryModel(1, 'Test Category')]);
    expect(component.taxes).toEqual([new ServiceTaxModel(1, 'Test Tax', 10)]);
  });
});
