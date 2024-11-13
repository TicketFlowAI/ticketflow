import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageServiceCategoryComponent } from './manage-service-category.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../../transloco-loader';
import { ServiceManagementService } from '../../../../core/services/service-management.service';
import { of } from 'rxjs';
import { ServiceCategoryModel } from '../../../../core/models/entities/service-category.model';

describe('ManageServiceCategoryComponent', () => {
  let component: ManageServiceCategoryComponent;
  let fixture: ComponentFixture<ManageServiceCategoryComponent>;
  let serviceManagementServiceSpy: jasmine.SpyObj<ServiceManagementService>;

  beforeEach(async () => {
    const mockServiceManagementService = jasmine.createSpyObj('ServiceManagementService', [
      'editServiceCategory',
      'addServiceCategory',
    ]);

    mockServiceManagementService.editServiceCategory.and.returnValue(of(null));
    mockServiceManagementService.addServiceCategory.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [ManageServiceCategoryComponent],
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
          useValue: new ServiceCategoryModel(1, 'Test Category'), // Mock de MAT_DIALOG_DATA
        },
        { provide: ServiceManagementService, useValue: mockServiceManagementService }, // Mock de ServiceManagementService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageServiceCategoryComponent);
    component = fixture.componentInstance;
    serviceManagementServiceSpy = TestBed.inject(ServiceManagementService) as jasmine.SpyObj<ServiceManagementService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize serviceCategoryData from MAT_DIALOG_DATA', () => {
    const serviceCategory = component.serviceCategory;
    expect(serviceCategory).toBeTruthy();
    expect(serviceCategory?.id).toBe(1);
    expect(serviceCategory?.category).toBe('Test Category');
  });

  it('should call editServiceCategory and close dialog on save click with existing category', () => {
    component.onSaveClick();
    expect(serviceManagementServiceSpy.editServiceCategory).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call addServiceCategory and close dialog on save click for new category', () => {
    component.serviceCategoryData = null;
    component.categoryFormControl.setValue('New Category');
    component.onSaveClick();
    expect(serviceManagementServiceSpy.addServiceCategory).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
