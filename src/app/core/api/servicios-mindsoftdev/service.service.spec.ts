import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { environment } from '../../../../environments/environment';
import {
  IServicesApiResponse,
  IServiceApiResponse,
  ServiceModel,
} from '../../models/entities/service.model';

describe('ServiceService', () => {
  let service: ServiceService;
  let httpTestingController: HttpTestingController;

  const mockServicesResponse: IServicesApiResponse = {
    success: true,
    data: [
      new ServiceModel(1, 'Service A', 'Details A', 1, 1, 100, 'Category A', 'Tax A'),
      new ServiceModel(2, 'Service B', 'Details B', 2, 2, 200, 'Category B', 'Tax B'),
    ],
  };

  const mockServiceResponse: IServiceApiResponse = {
    success: true,
    data: new ServiceModel(1, 'Service A', 'Details A', 1, 1, 100, 'Category A', 'Tax A'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService],
    });
    service = TestBed.inject(ServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get services', () => {
    service.getServices().subscribe((response) => {
      expect(response).toEqual(mockServicesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServicesResponse);
  });

  it('should get a single service by ID', () => {
    const serviceId = 1;

    service.getService(serviceId).subscribe((response) => {
      expect(response).toEqual(mockServiceResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services/${serviceId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServiceResponse);
  });

  it('should create a service', () => {
    const newService = new ServiceModel(0, 'Service C', 'Details C', 3, 3, 150, 'Category C', 'Tax C');

    service.createService(newService).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newService);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a service', () => {
    const updatedService = new ServiceModel(1, 'Updated Service', 'Updated Details', 1, 1, 120, 'Category A', 'Tax A');

    service.updateService(updatedService).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services/${updatedService.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedService);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a service by ID', () => {
    const serviceId = 1;

    service.deleteService(serviceId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services/${serviceId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get deleted services', () => {
    service.getDeletedServices().subscribe((response) => {
      expect(response).toEqual(mockServicesResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockServicesResponse);
  });

  it('should restore a deleted service', () => {
    const serviceId = 1;

    service.restoreService(serviceId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/services/${serviceId}/restore`);
    expect(req.request.method).toBe('PUT');

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});