import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceTaxService } from './service-tax.service';
import { environment } from '../../../../environments/environment';
import {
  IServiceTaxesApiResponse,
  IServiceTaxApiResponse,
  ServiceTaxModel,
} from '../../models/entities/service-tax.model';

describe('ServiceTaxService', () => {
  let service: ServiceTaxService;
  let httpTestingController: HttpTestingController;

  const mockTaxesResponse: IServiceTaxesApiResponse = {
    success: true,
    data: [
      new ServiceTaxModel(1, 'Tax A', 15),
      new ServiceTaxModel(2, 'Tax B', 20),
    ],
  };

  const mockTaxResponse: IServiceTaxApiResponse = {
    success: true,
    data: new ServiceTaxModel(1, 'Tax A', 15),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceTaxService],
    });
    service = TestBed.inject(ServiceTaxService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get service taxes', () => {
    service.getServiceTaxes().subscribe((response) => {
      expect(response).toEqual(mockTaxesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTaxesResponse);
  });

  it('should get a single service tax by ID', () => {
    const taxId = 1;

    service.getServiceTax(taxId).subscribe((response) => {
      expect(response).toEqual(mockTaxResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/${taxId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTaxResponse);
  });

  it('should create a service tax', () => {
    const newTax = new ServiceTaxModel(0, 'Tax C', 10);

    service.createServiceTax(newTax).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTax);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a service tax', () => {
    const updatedTax = new ServiceTaxModel(1, 'Updated Tax', 18);

    service.updateServiceTax(updatedTax).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/${updatedTax.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTax);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a service tax by ID', () => {
    const taxId = 1;

    service.deleteServiceTax(taxId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/${taxId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get deleted service taxes successfully', (done) => {
    service.getDeletedServiceTaxes().subscribe({
      next: (response) => {
        expect(response).toEqual(mockTaxesResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTaxesResponse);
  });
  
  it('should handle error when getting deleted service taxes', (done) => {
    service.getDeletedServiceTaxes().subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should restore a service tax successfully', (done) => {
    const taxId = 1;
  
    service.restoreServiceTax(taxId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/${taxId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when restoring a service tax', (done) => {
    const taxId = 1;
  
    service.restoreServiceTax(taxId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/taxes/${taxId}/restore`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  
});
