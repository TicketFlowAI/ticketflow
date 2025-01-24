import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportsService } from './reports.service';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IReportNumberResponse } from '../../models/reports/common-fields/report-number-response.model';
import { IReportTicketComplaxityModelResponse } from '../../models/reports/global/fields/report-ticket-complexity.model';
import { IReportTicketEscalationsModelResponse } from '../../models/reports/global/fields/report-ticket-escalations.model';
import { IReportTechnicianScorePerQuestionResponse } from '../../models/reports/techinican-performance/fields/report-score-per-question.model';
import { IReportTechnicianReassingsModelResponse } from '../../models/reports/techinican-performance/fields/report-technician-reassigns.model';
import { IReportTechnicianWeeklyComparisonModelResponse } from '../../models/reports/techinican-performance/fields/report-technician-weekly-comparison.model';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;
  let customHeadersServiceSpy: jasmine.SpyObj<CustomHeadersService>;

  const apiReports = environment.apiEndpoint + '/api/reports';

  beforeEach(() => {
    const mockCustomHeadersService = jasmine.createSpyObj('CustomHeadersService', ['addAppJson']);
    mockCustomHeadersService.addAppJson.and.returnValue({ getHeaders: () => ({ 'Content-Type': 'application/json' }) });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportsService, { provide: CustomHeadersService, useValue: mockCustomHeadersService }],
    });

    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
    customHeadersServiceSpy = TestBed.inject(CustomHeadersService) as jasmine.SpyObj<CustomHeadersService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTicketsSolved and return expected data', () => {
    const mockResponse: IReportNumberResponse = { success: true, data: 42 };

    service.getTicketsSolved().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/tickets-solved`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getAverageTimeToClose and return expected data', () => {
    const mockResponse: IReportNumberResponse = { success: true, data: 10 };

    service.getAverageTimeToClose().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/average-time-to-close`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getTicketsEscalations and return expected data', () => {
    const mockResponse: IReportTicketEscalationsModelResponse = {
      success: true,
      data: [
        { ticket_id: 1, technicians_count: 2 },
        { ticket_id: 2, technicians_count: 3 },
      ],
    };

    service.getTicketsEscalations().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/tickets-escalations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getTicketsPerComplexity and return expected data', () => {
    const mockResponse: IReportTicketComplaxityModelResponse = {
      success: true,
      data: [
        { complexity: 1, count: 10 },
        { complexity: 2, count: 5 },
      ],
    };

    service.getTicketsPerComplexity().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/tickets-per-complexity`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getTicketsHumanInteraction and return expected data', () => {
    const mockResponse: IReportNumberResponse = { success: true, data: 15 };

    service.getTicketsHumanInteraction().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/tickets-human-interaction`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getGlobalAverageScorePerQuestion and return expected data', () => {
    const mockResponse: IReportTechnicianScorePerQuestionResponse = {
      success: true,
      data: [
        { question_id: 1, question: 'Pregunta 1', average_score: 4.5 },
        { question_id: 2, question: 'Pregunta 2', average_score: 3.8 },
      ],
    };

    service.getGlobalAverageScorePerQuestion().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/average-score-per-question`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getTicketsSolvedByTechnicianId and return expected data', () => {
    const userId = 1;
    const startDate = '2023-01-01';
    const endDate = '2023-01-31';
    const mockResponse: IReportNumberResponse = { success: true, data: 20 };

    service.getTicketsSolvedByTechnicianId(userId, startDate, endDate).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/tickets-solved?start_date=${startDate}&end_date=${endDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getAverageTimeToSolvedByTechnicianId and return expected data', () => {
    const userId = 1;
    const startDate = '2023-01-01';
    const endDate = '2023-01-31';
    const mockResponse: IReportNumberResponse = { success: true, data: 5 };

    service.getAverageTimeToSolvedByTechnicianId(userId, startDate, endDate).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/average-time-to-solve?start_date=${startDate}&end_date=${endDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getTTicketsAssignedReassignedByTechnicianId and return expected data', () => {
    const userId = 1;
    const startDate = '2023-01-01';
    const endDate = '2023-01-31';
    const mockResponse: IReportTechnicianReassingsModelResponse = {
      success: true,
      data: { reassigned: 3, assigned: 10 },
    };

    service.getTTicketsAssignedReassignedByTechnicianId(userId, startDate, endDate).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/tickets-assigned-reassigned?start_date=${startDate}&end_date=${endDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getCurrentTicketsByTechnicianId and return expected data', () => {
    const userId = 1;
    const mockResponse: IReportNumberResponse = { success: true, data: 8 };

    service.getCurrentTicketsByTechnicianId(userId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/current-tickets`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getWeeklyComparisonByTechnicianId and return expected data', () => {
    const userId = 1;
    const mockResponse: IReportTechnicianWeeklyComparisonModelResponse = {
      success: true,
      data: { previous_week: 10, current_week: 15 },
    };

    service.getWeeklyComparisonByTechnicianId(userId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/weekly-comparison`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getAverageScoreSurvey and return expected data', () => {
    const userId = 1;
    const mockResponse: number = 4.3;

    service.getAverageScoreSurvey(userId).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/average-score-per-question`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getAverageScorePerQuestion and return expected data', () => {
    const userId = 1;
    const mockResponse: IReportTechnicianScorePerQuestionResponse = {
      success: true,
      data: [
        { question_id: 1, question: 'Pregunta 1', average_score: 4.5 },
        { question_id: 2, question: 'Pregunta 2', average_score: 3.8 },
      ],
    };

    service.getAverageScorePerQuestion(userId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiReports}/technician/${userId}/average-score`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
