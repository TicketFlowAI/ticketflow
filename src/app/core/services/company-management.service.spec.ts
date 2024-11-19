import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CompanyManagementService } from './company-management.service';
import { CompanyService } from '../api/servicios-mindsoftdev/company.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { CompanyModel } from '../models/entities/company.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { HttpResponse } from '@angular/common/http';

describe('CompanyManagementService', () => {
  let service: CompanyManagementService;
  let companyServiceMock: jasmine.SpyObj<CompanyService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockCompany = new CompanyModel(1, 'Company A', '12345', 'email@company.com', '123456789', 'State A', 'City A', 'Address A');
  const mockCompanies = [mockCompany];

  beforeEach(() => {
    const companySpy = jasmine.createSpyObj('CompanyService', ['getCompanies', 'getCompany', 'createCompany', 'updateCompany', 'deleteCompany']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['addSuccessMessage', 'addErrorMessage']);
    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);

    TestBed.configureTestingModule({
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
        { provide: CompanyService, useValue: companySpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(CompanyManagementService);
    companyServiceMock = TestBed.inject(CompanyService) as jasmine.SpyObj<CompanyService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all companies successfully', (done) => {
    companyServiceMock.getCompanies.and.returnValue(of({ success: true, data: mockCompanies }));

    service.getAllCompanies().subscribe((companies) => {
      expect(companies).toEqual(mockCompanies);
      expect(companyServiceMock.getCompanies).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all companies', (done) => {
    companyServiceMock.getCompanies.and.returnValue(throwError(() => new Error('Error fetching companies')));

    service.getAllCompanies().subscribe((companies) => {
      expect(companies).toEqual([]);
      expect(companyServiceMock.getCompanies).toHaveBeenCalled();
      done();
    });
  });

  it('should get one company successfully', (done) => {
    companyServiceMock.getCompany.and.returnValue(of({ success: true, data: mockCompany }));

    service.getOneCompany(1).subscribe((company) => {
      expect(company).toEqual(mockCompany);
      expect(companyServiceMock.getCompany).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one company', (done) => {
    companyServiceMock.getCompany.and.returnValue(throwError(() => new Error('Error fetching company')));

    service.getOneCompany(1).subscribe((company) => {
      expect(company).toBeNull();
      expect(companyServiceMock.getCompany).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a company successfully', (done) => {
    companyServiceMock.createCompany.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addCompany(mockCompany).subscribe((result) => {
      expect(result).toBeTrue();
      expect(companyServiceMock.createCompany).toHaveBeenCalledWith(mockCompany);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a company', (done) => {
    companyServiceMock.createCompany.and.returnValue(throwError(() => new Error('Error creating company')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addCompany(mockCompany).subscribe((result) => {
      expect(result).toBeFalse();
      expect(companyServiceMock.createCompany).toHaveBeenCalledWith(mockCompany);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a company successfully', (done) => {
    companyServiceMock.updateCompany.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editCompany(mockCompany).subscribe((result) => {
      expect(result).toBeTrue();
      expect(companyServiceMock.updateCompany).toHaveBeenCalledWith(mockCompany);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while editing a company', (done) => {
    companyServiceMock.updateCompany.and.returnValue(throwError(() => new Error('Error updating company')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editCompany(mockCompany).subscribe((result) => {
      expect(result).toBeFalse();
      expect(companyServiceMock.updateCompany).toHaveBeenCalledWith(mockCompany);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a company successfully', (done) => {
    companyServiceMock.deleteCompany.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteCompany(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(companyServiceMock.deleteCompany).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a company', (done) => {
    companyServiceMock.deleteCompany.and.returnValue(throwError(() => new Error('Error deleting company')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteCompany(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(companyServiceMock.deleteCompany).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
