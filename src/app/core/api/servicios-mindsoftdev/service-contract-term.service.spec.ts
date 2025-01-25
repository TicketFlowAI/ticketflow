import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceContractTermService } from './service-contract-term.service';
import { environment } from '../../../../environments/environment';
import {
  IServiceContractTermsApiResponse,
  IServiceContractTermApiResponse,
  ServiceContractTermModel,
} from '../../models/entities/service-contract-term.model';

describe('ServiceContractTermService', () => {
  let service: ServiceContractTermService;
  let httpTestingController: HttpTestingController;

  const mockTermsResponse: IServiceContractTermsApiResponse = {
    success: true,
    data: [
      new ServiceContractTermModel(1, 'Term A', 12),
      new ServiceContractTermModel(2, 'Term B', 24),
    ],
  };

  const mockTermResponse: IServiceContractTermApiResponse = {
    success: true,
    data: new ServiceContractTermModel(1, 'Term A', 12),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceContractTermService],
    });
    service = TestBed.inject(ServiceContractTermService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get service contract terms', () => {
    service.getServiceContractTerms().subscribe((response) => {
      expect(response).toEqual(mockTermsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTermsResponse);
  });

  it('should get a single service contract term by ID', () => {
    const termId = 1;

    service.getServiceContractTerm(termId).subscribe((response) => {
      expect(response).toEqual(mockTermResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/${termId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTermResponse);
  });

  it('should create a service contract term', () => {
    const newTerm = new ServiceContractTermModel(0, 'New Term', 36);

    service.createServiceContractTerm(newTerm).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTerm);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a service contract term', () => {
    const updatedTerm = new ServiceContractTermModel(1, 'Updated Term', 48);

    service.updateServiceContractTerm(updatedTerm).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/${updatedTerm.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTerm);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a service contract term by ID', () => {
    const termId = 1;

    service.deleteServiceContractTerm(termId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/${termId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get deleted service contract terms successfully', (done) => {
    service.getDeletedServiceContractTerms().subscribe({
      next: (response) => {
        expect(response).toEqual(mockTermsResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTermsResponse);
  });
  
  it('should handle error when getting deleted service contract terms', (done) => {
    service.getDeletedServiceContractTerms().subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should restore a service contract term successfully', (done) => {
    const termId = 1;
  
    service.restoreServiceContractTerm(termId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/${termId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when restoring a service contract term', (done) => {
    const termId = 1;
  
    service.restoreServiceContractTerm(termId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/serviceTerms/${termId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });
  
});
