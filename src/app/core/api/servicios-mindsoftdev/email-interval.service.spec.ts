import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmailIntervalService } from './email-interval.service';
import { environment } from '../../../../environments/environment';
import {
  IEmailIntervalsApiResponse,
  IEmailIntervalApiResponse,
  EmailIntervalModel,
} from '../../models/entities/email-interval.model';

describe('EmailIntervalService', () => {
  let service: EmailIntervalService;
  let httpTestingController: HttpTestingController;

  const mockIntervalsResponse: IEmailIntervalsApiResponse = {
    success: true,
    data: [
      new EmailIntervalModel(1, 7, 'Type A', 101, 'Template A'),
      new EmailIntervalModel(2, 14, 'Type B', 102, 'Template B'),
    ],
  };

  const mockIntervalResponse: IEmailIntervalApiResponse = {
    success: true,
    data: new EmailIntervalModel(1, 7, 'Type A', 101, 'Template A'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailIntervalService],
    });
    service = TestBed.inject(EmailIntervalService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get email intervals', () => {
    service.getEmailIntervals().subscribe((response) => {
      expect(response).toEqual(mockIntervalsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIntervalsResponse);
  });

  it('should get a single email interval by ID', () => {
    const intervalId = 1;

    service.getEmailInterval(intervalId).subscribe((response) => {
      expect(response).toEqual(mockIntervalResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals/${intervalId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIntervalResponse);
  });

  it('should get deleted email intervals', () => {
    service.getDeletedIntervals().subscribe((response) => {
      expect(response).toEqual(mockIntervalsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIntervalsResponse);
  });

  it('should create an email interval', () => {
    const newInterval = new EmailIntervalModel(0, 7, 'Type C', 103, 'Template C');

    service.createEmailInterval(newInterval).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newInterval);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update an email interval', () => {
    const updatedInterval = new EmailIntervalModel(1, 10, 'Type Updated', 101, 'Template Updated');

    service.updateEmailInterval(updatedInterval).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals/${updatedInterval.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedInterval);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete an email interval by ID', () => {
    const intervalId = 1;

    service.deleteEmailInterval(intervalId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals/${intervalId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should restore an email interval by ID', () => {
    const intervalId = 1;

    service.restoreEmailInterval(intervalId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/intervals/${intervalId}/restore`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull();

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
