import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCompanyComponent } from './manage-company.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../../transloco-loader';
import { CompanyManagementService } from '../../../core/services/company-management.service';
import { CompanyModel } from '../../../core/models/entities/company.model';
import { of } from 'rxjs';

describe('ManageCompanyComponent', () => {
  let component: ManageCompanyComponent;
  let fixture: ComponentFixture<ManageCompanyComponent>;
  let companyManagementServiceSpy: jasmine.SpyObj<CompanyManagementService>;

  beforeEach(async () => {
    const mockCompanyManagementService = jasmine.createSpyObj('CompanyManagementService', [
      'editCompany',
      'addCompany',
    ]);

    mockCompanyManagementService.editCompany.and.returnValue(of(null));
    mockCompanyManagementService.addCompany.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [ManageCompanyComponent],
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
          useValue: new CompanyModel(
            1,
            'Test Company',
            '123456789',
            'test@company.com',
            '1234567890',
            'Test State',
            'Test City',
            'Test Address'
          ),
        },
        { provide: CompanyManagementService, useValue: mockCompanyManagementService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageCompanyComponent);
    component = fixture.componentInstance;
    companyManagementServiceSpy = TestBed.inject(CompanyManagementService) as jasmine.SpyObj<CompanyManagementService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize company data from MAT_DIALOG_DATA', () => {
    const company = component.company;
    expect(company).toBeTruthy();
    expect(company?.id).toBe(1);
    expect(company?.name).toBe('Test Company');
    expect(company?.idNumber).toBe('123456789');
    expect(company?.contactEmail).toBe('test@company.com');
    expect(company?.phone).toBe('1234567890');
    expect(company?.state).toBe('Test State');
    expect(company?.city).toBe('Test City');
    expect(company?.address).toBe('Test Address');
  });

  it('should close the dialog on save click with editCompany', () => {
    component.onSaveClick();
    expect(companyManagementServiceSpy.editCompany).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
