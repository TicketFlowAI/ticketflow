import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceContractService } from './service-contract.service';
import { environment } from '../../../../environments/environment';
import {
  IServiceContractsApiResponse,
  IServiceContractApiResponse,
  ServiceContractModel,
} from '../../models/entities/service-contract.model';

describe('ServiceContractService', () => {
  let service: ServiceContractService;
  let httpTestingController: HttpTestingController;

  const mockContractsResponse: IServiceContractsApiResponse = {
    success: true,
    data: [
      new ServiceContractModel(1, 1, 1, 1, 'Company A', 'Service A', 'Term A', 100.0),
      new ServiceContractModel(2, 2, 2, 2, 'Company B', 'Service B', 'Term B', 200.0),
    ],
  };

  const mockContractResponse: IServiceContractApiResponse = {
    success: true,
    data: new ServiceContractModel(1, 1, 1, 1, 'Company A', 'Service A', 'Term A', 100.0),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceContractService],
    });
    service = TestBed.inject(ServiceContractService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get service contracts', () => {
    service.getServiceContracts().subscribe((response) => {
      expect(response).toEqual(mockContractsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContractsResponse);
  });

  it('should get service contracts by company ID', () => {
    const companyId = 1;

    service.getServiceContractsByCompany(companyId).subscribe((response) => {
      expect(response).toEqual(mockContractsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/bycompany/${companyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContractsResponse);
  });

  it('should get a single service contract by ID', () => {
    const contractId = 1;

    service.getServiceContract(contractId).subscribe((response) => {
      expect(response).toEqual(mockContractResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${contractId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContractResponse);
  });

  it('should create a service contract', () => {
    const newContract = new ServiceContractModel(0, 1, 1, 1, 'Company A', 'Service A', 'Term A', 150.0);

    service.createServiceContract(newContract).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newContract);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a service contract', () => {
    const updatedContract = new ServiceContractModel(1, 1, 1, 1, 'Company A Updated', 'Service A Updated', 'Term A Updated', 200.0);

    service.updateServiceContract(updatedContract).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${updatedContract.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedContract);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a service contract by ID', () => {
    const contractId = 1;

    service.deleteServiceContract(contractId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${contractId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get deleted service contracts successfully', (done) => {
    service.getDeletedServiceContracts().subscribe({
      next: (response) => {
        expect(response).toEqual(mockContractsResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContractsResponse);
  });
  
  it('should handle error when getting deleted service contracts', (done) => {
    service.getDeletedServiceContracts().subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should restore a service contract successfully', (done) => {
    const contractId = 1;
  
    service.restoreServiceContract(contractId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${contractId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when restoring a service contract', (done) => {
    const contractId = 1;
  
    service.restoreServiceContract(contractId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${contractId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should create a new service contract request successfully', (done) => {
    const request = { company_id: 1, service_id: 1 };
  
    service.newServiceContractRequest(request).subscribe({
      next: (response) => {
        expect(response.status).toBe(201);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/request`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
  
    req.flush({}, { status: 201, statusText: 'Created' });
  });
  
  it('should handle error when creating a new service contract request', (done) => {
    const request = { company_id: 1, service_id: 1 };
  
    service.newServiceContractRequest(request).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/request`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should cancel a service contract request successfully', (done) => {
    const contractId = 1;
  
    service.cancelServiceContractRequest(contractId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/cancel`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ contract_id: contractId });
  
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when cancelling a service contract request', (done) => {
    const contractId = 1;
  
    service.cancelServiceContractRequest(contractId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/cancel`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });
  
  it('should get deleted service contracts successfully', (done) => {
    service.getDeletedServiceContracts().subscribe({
      next: (response) => {
        expect(response).toEqual(mockContractsResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContractsResponse);
  });
  
  it('should handle error when getting deleted service contracts', (done) => {
    service.getDeletedServiceContracts().subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should restore a service contract successfully', (done) => {
    const contractId = 1;
  
    service.restoreServiceContract(contractId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${contractId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when restoring a service contract', (done) => {
    const contractId = 1;
  
    service.restoreServiceContract(contractId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/${contractId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should create a new service contract request successfully', (done) => {
    const request = { company_id: 1, service_id: 1 };
  
    service.newServiceContractRequest(request).subscribe({
      next: (response) => {
        expect(response.status).toBe(201);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/request`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
  
    req.flush({}, { status: 201, statusText: 'Created' });
  });
  
  it('should handle error when creating a new service contract request', (done) => {
    const request = { company_id: 1, service_id: 1 };
  
    service.newServiceContractRequest(request).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/request`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should cancel a service contract request successfully', (done) => {
    const contractId = 1;
  
    service.cancelServiceContractRequest(contractId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/cancel`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ contract_id: contractId });
  
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when cancelling a service contract request', (done) => {
    const contractId = 1;
  
    service.cancelServiceContractRequest(contractId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/servicecontracts/cancel`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });  
});
