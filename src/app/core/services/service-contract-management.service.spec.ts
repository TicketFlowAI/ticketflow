import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ServiceContractManagementService } from './service-contract-management.service';
import { ServiceContractService } from '../api/servicios-mindsoftdev/service-contract.service';
import { ServiceContractTermService } from '../api/servicios-mindsoftdev/service-contract-term.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { ServiceContractModel } from '../models/entities/service-contract.model';
import { ServiceContractTermModel } from '../models/entities/service-contract-term.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { HttpResponse } from '@angular/common/http';

describe('ServiceContractManagementService', () => {
  let service: ServiceContractManagementService;
  let contractServiceMock: jasmine.SpyObj<ServiceContractService>;
  let contractTermServiceMock: jasmine.SpyObj<ServiceContractTermService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockServiceContract = new ServiceContractModel(1, 1, 1, 1, 'Company A', 'Service A', 'Term A', 100);
  const mockServiceContracts = [mockServiceContract];

  const mockServiceContractTerm = new ServiceContractTermModel(1, 'Monthly', 12);
  const mockServiceContractTerms = [mockServiceContractTerm];

  beforeEach(() => {
    const contractSpy = jasmine.createSpyObj('ServiceContractService', [
      'getServiceContracts',
      'getServiceContractsByCompany',
      'getServiceContract',
      'createServiceContract',
      'updateServiceContract',
      'deleteServiceContract'
    ]);

    const contractTermSpy = jasmine.createSpyObj('ServiceContractTermService', [
      'getServiceContractTerms',
      'getServiceContractTerm',
      'createServiceContractTerm',
      'updateServiceContractTerm',
      'deleteServiceContractTerm'
    ]);

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
        { provide: ServiceContractService, useValue: contractSpy },
        { provide: ServiceContractTermService, useValue: contractTermSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(ServiceContractManagementService);
    contractServiceMock = TestBed.inject(ServiceContractService) as jasmine.SpyObj<ServiceContractService>;
    contractTermServiceMock = TestBed.inject(ServiceContractTermService) as jasmine.SpyObj<ServiceContractTermService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all service contracts successfully', (done) => {
    contractServiceMock.getServiceContracts.and.returnValue(of({ success: true, data: mockServiceContracts }));

    service.getAllServiceContracts().subscribe((contracts) => {
      expect(contracts).toEqual(mockServiceContracts);
      expect(contractServiceMock.getServiceContracts).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all service contracts', (done) => {
    contractServiceMock.getServiceContracts.and.returnValue(throwError(() => new Error('Error fetching service contracts')));

    service.getAllServiceContracts().subscribe((contracts) => {
      expect(contracts).toEqual([]);
      expect(contractServiceMock.getServiceContracts).toHaveBeenCalled();
      done();
    });
  });

  it('should get all service contracts from a company successfully', (done) => {
    contractServiceMock.getServiceContractsByCompany.and.returnValue(of({ success: true, data: mockServiceContracts }));

    service.getAllServiceContractsFromCompany(1).subscribe((contracts) => {
      expect(contracts).toEqual(mockServiceContracts);
      expect(contractServiceMock.getServiceContractsByCompany).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all service contracts from a company', (done) => {
    contractServiceMock.getServiceContractsByCompany.and.returnValue(throwError(() => new Error('Error fetching service contracts')));

    service.getAllServiceContractsFromCompany(1).subscribe((contracts) => {
      expect(contracts).toEqual([]);
      expect(contractServiceMock.getServiceContractsByCompany).toHaveBeenCalled();
      done();
    });
  });

  it('should get one service contract successfully', (done) => {
    contractServiceMock.getServiceContract.and.returnValue(of({ success: true, data: mockServiceContract }));

    service.getOneServiceContract(1).subscribe((contract) => {
      expect(contract).toEqual(mockServiceContract);
      expect(contractServiceMock.getServiceContract).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one service contract', (done) => {
    contractServiceMock.getServiceContract.and.returnValue(throwError(() => new Error('Error fetching service contract')));

    service.getOneServiceContract(1).subscribe((contract) => {
      expect(contract).toBeNull();
      expect(contractServiceMock.getServiceContract).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a service contract successfully', (done) => {
    contractServiceMock.createServiceContract.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceContract(mockServiceContract).subscribe((result) => {
      expect(result).toBeTrue();
      expect(contractServiceMock.createServiceContract).toHaveBeenCalledWith(mockServiceContract);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a service contract', (done) => {
    contractServiceMock.createServiceContract.and.returnValue(throwError(() => new Error('Error creating service contract')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceContract(mockServiceContract).subscribe((result) => {
      expect(result).toBeFalse();
      expect(contractServiceMock.createServiceContract).toHaveBeenCalledWith(mockServiceContract);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a service contract successfully', (done) => {
    contractServiceMock.updateServiceContract.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceContract(mockServiceContract).subscribe((result) => {
      expect(result).toBeTrue();
      expect(contractServiceMock.updateServiceContract).toHaveBeenCalledWith(mockServiceContract);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while editing a service contract', (done) => {
    contractServiceMock.updateServiceContract.and.returnValue(throwError(() => new Error('Error updating service contract')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceContract(mockServiceContract).subscribe((result) => {
      expect(result).toBeFalse();
      expect(contractServiceMock.updateServiceContract).toHaveBeenCalledWith(mockServiceContract);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a service contract successfully', (done) => {
    contractServiceMock.deleteServiceContract.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceContract(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(contractServiceMock.deleteServiceContract).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a service contract', (done) => {
    contractServiceMock.deleteServiceContract.and.returnValue(throwError(() => new Error('Error deleting service contract')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceContract(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(contractServiceMock.deleteServiceContract).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should get all service contract terms successfully', (done) => {
    contractTermServiceMock.getServiceContractTerms.and.returnValue(of({ success: true, data: mockServiceContractTerms }));

    service.getAllServiceContractTerms().subscribe((contractTerms) => {
      expect(contractTerms).toEqual(mockServiceContractTerms);
      expect(contractTermServiceMock.getServiceContractTerms).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all service contract terms', (done) => {
    contractTermServiceMock.getServiceContractTerms.and.returnValue(throwError(() => new Error('Error fetching service contract terms')));
        
    service.getAllServiceContractTerms().subscribe((contractTerms) => {
      expect(contractTerms).toEqual([]);
      expect(contractTermServiceMock.getServiceContractTerms).toHaveBeenCalled();
      done();
    });
  });

  it('should get one service contract term successfully', (done) => {
    contractTermServiceMock.getServiceContractTerm.and.returnValue(of({ success: true, data: mockServiceContractTerm }));

    service.getOneServiceContractTerm(1).subscribe((contract) => {
      expect(contract).toEqual(mockServiceContractTerm);
      expect(contractTermServiceMock.getServiceContractTerm).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should handle error while getting one service contract term', (done) => {
    contractTermServiceMock.getServiceContractTerm.and.returnValue(throwError(() => new Error('Error fetching service contract')));

    service.getOneServiceContractTerm(1).subscribe((contract) => {
      expect(contract).toBeNull();
      expect(contractTermServiceMock.getServiceContractTerm).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should add a service contract term successfully', (done) => {
    contractTermServiceMock.createServiceContractTerm.and.returnValue(of(new HttpResponse({ status: 201 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceContractTerm(mockServiceContractTerm).subscribe((result) => {
      expect(result).toBeTrue();
      expect(contractTermServiceMock.createServiceContractTerm).toHaveBeenCalledWith(mockServiceContractTerm);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while adding a service contract term', (done) => {
    contractTermServiceMock.createServiceContractTerm.and.returnValue(throwError(() => new Error('Error creating service contract term')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.addServiceContractTerm(mockServiceContractTerm).subscribe((result) => {
      expect(result).toBeFalse();
      expect(contractTermServiceMock.createServiceContractTerm).toHaveBeenCalledWith(mockServiceContractTerm);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should edit a service contract term successfully', (done) => {
    contractTermServiceMock.updateServiceContractTerm.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceContractTerm(mockServiceContractTerm).subscribe((result) => {
      expect(result).toBeTrue();
      expect(contractTermServiceMock.updateServiceContractTerm).toHaveBeenCalledWith(mockServiceContractTerm);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  

  it('should handle error while editing a service contract term', (done) => {
    contractTermServiceMock.updateServiceContractTerm.and.returnValue(throwError(() => new Error('Error updating service contract term')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.editServiceContractTerm(mockServiceContractTerm).subscribe((result) => {
      expect(result).toBeFalse();
      expect(contractTermServiceMock.updateServiceContractTerm).toHaveBeenCalledWith(mockServiceContractTerm);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should delete a service contract term successfully', (done) => {
    contractTermServiceMock.deleteServiceContractTerm.and.returnValue(of(new HttpResponse({ status: 200 })));
    translocoServiceMock.translateObject.and.returnValue([]);
    
    service.deleteServiceContractTerm(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(contractTermServiceMock.deleteServiceContractTerm).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while deleting a service contract term', (done) => {
    contractTermServiceMock.deleteServiceContractTerm.and.returnValue(throwError(() => new Error('Error deleting service contract term')));
    translocoServiceMock.translateObject.and.returnValue([]);

    service.deleteServiceContractTerm(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(contractTermServiceMock.deleteServiceContractTerm).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
});
