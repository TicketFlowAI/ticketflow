import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AiService } from './ai.service';
import { environment } from '../../../../environments/environment';
import { IAiClassifiersApiResponse } from '../../models/entities/ai-classifier.model';
import { HttpHeaders } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';

// Mock CustomHeadersService
class MockCustomHeadersService {
  private headers = new HttpHeaders();

  addXsrfToken() {
    this.headers = this.headers.append('X-XSRF-TOKEN', 'mock-token');
    return this;
  }

  addAppJson() {
    this.headers = this.headers.append('Content-Type', 'application/json');
    return this;
  }

  getHeaders() {
    return this.headers;
  }
}

describe('AiService', () => {
  let service: AiService;
  let httpTestingController: HttpTestingController;

  const mockResponse: IAiClassifiersApiResponse = {
    success: true,
    data: [
      {
        ClassifierName: 'Classifier A',
        ClassifierArn: 'arn:aws:mock:classifier-a',
        VersionName: 'v1.0',
        Status: 'ACTIVE',
        LanguageCode: 'en',
        SubmitTime: '2023-01-01T00:00:00Z',
        EndTime: '2023-01-02T00:00:00Z',
        NumberOfLabels: 5,
        Accuracy: 0.95,
        F1Score: 0.93,
        Precision: 0.94,
        Recall: 0.92,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AiService,
        { provide: CustomHeadersService, useClass: MockCustomHeadersService },
      ],
    });

    service = TestBed.inject(AiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get classifiers and version', () => {
    service.getClassifiersAndVersion().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/classifiers`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    expect(req.request.headers.has('X-XSRF-TOKEN')).toBeTrue();
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });

  it('should select classifiers', () => {
    const mockClassiPrio = 'arn:aws:mock:priority';
    const mockClassiPrioHuma = 'arn:aws:mock:human';

    service.selectClassifiers(mockClassiPrio, mockClassiPrioHuma).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiEndpoint}/api/classifiers/update-classifiers`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBeTrue();
    expect(req.request.body).toEqual({
      priority_classifier_arn: mockClassiPrio,
      human_intervention_classifier_arn: mockClassiPrioHuma,
    });

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
