import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ReportsService } from "../api/servicios-mindsoftdev/reports.service";
import { ReportTicketComplexityModel } from "../models/reports/global/fields/report-ticket-complexity.model";
import { ReportTicketEscalationsModel } from "../models/reports/global/fields/report-ticket-escalations.model";
import { ReportTechnicianScorePerQuestion } from "../models/reports/techinican-performance/fields/report-score-per-question.model";
import { ReportTechnicianReassignsModel } from "../models/reports/techinican-performance/fields/report-technician-reassigns.model";
import { ReportTechnicianWeeklyComparisonModel } from "../models/reports/techinican-performance/fields/report-technician-weekly-comparison.model";
import { ReportManagementService } from "./report-management.service";
import { of, throwError } from "rxjs";

describe('ReportManagementService', () => {
  let service: ReportManagementService;
  let reportsServiceMock: jasmine.SpyObj<ReportsService>;

  const mockComplexityReport = [new ReportTicketComplexityModel(1, 100)];
  const mockEscalationsReport = [new ReportTicketEscalationsModel(1, 5)];
  const mockScorePerQuestionReport = [new ReportTechnicianScorePerQuestion(1, 'Question 1', 4.5)];
  const mockTechnicianReassigns = new ReportTechnicianReassignsModel(10, 2);
  const mockWeeklyComparison = new ReportTechnicianWeeklyComparisonModel(20, 15);

  beforeEach(() => {
    const reportsSpy = jasmine.createSpyObj('ReportsService', [
      'getTicketsSolved',
      'getAverageTimeToClose',
      'getTicketsEscalations',
      'getTicketsPerComplexity',
      'getTicketsHumanInteraction',
      'getGlobalAverageScorePerQuestion',
      'getTicketsSolvedByTechnicianId',
      'getAverageTimeToSolvedByTechnicianId',
      'getTTicketsAssignedReassignedByTechnicianId',
      'getCurrentTicketsByTechnicianId',
      'getWeeklyComparisonByTechnicianId',
      'getAverageScoreSurvey',
      'getAverageScorePerQuestion',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: ReportsService, useValue: reportsSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ReportManagementService);
    reportsServiceMock = TestBed.inject(ReportsService) as jasmine.SpyObj<ReportsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get global tickets solved quantity successfully', (done) => {
    reportsServiceMock.getTicketsSolved.and.returnValue(of({ success: true, data: 100 }));
  
    service.getGlobalTicketsSolvedQty().subscribe((result) => {
      expect(result).toBe(100);
      expect(reportsServiceMock.getTicketsSolved).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get global average time to close successfully', (done) => {
    reportsServiceMock.getAverageTimeToClose.and.returnValue(of({ success: true, data: 5.5 }));
  
    service.getGlobalAverageTimeToClose().subscribe((result) => {
      expect(result).toBe(5.5);
      expect(reportsServiceMock.getAverageTimeToClose).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get global tickets escalations successfully', (done) => {
    reportsServiceMock.getTicketsEscalations.and.returnValue(of({ success: true, data: mockEscalationsReport }));
  
    service.getGlobalTicketsEscalations().subscribe((result) => {
      expect(result).toEqual(mockEscalationsReport);
      expect(reportsServiceMock.getTicketsEscalations).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get global tickets per complexity successfully', (done) => {
    reportsServiceMock.getTicketsPerComplexity.and.returnValue(of({ success: true, data: mockComplexityReport }));
  
    service.getGlobalTicketsPerComplexity().subscribe((result) => {
      expect(result).toEqual(mockComplexityReport);
      expect(reportsServiceMock.getTicketsPerComplexity).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get global tickets human interaction successfully', (done) => {
    reportsServiceMock.getTicketsHumanInteraction.and.returnValue(of({ success: true, data: 50 }));
  
    service.getGlobalTicketsHumanInteraction().subscribe((result) => {
      expect(result).toBe(50);
      expect(reportsServiceMock.getTicketsHumanInteraction).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get global average score per question successfully', (done) => {
    reportsServiceMock.getGlobalAverageScorePerQuestion.and.returnValue(of({ success: true, data: mockScorePerQuestionReport }));
  
    service.getGlobalAverageScore().subscribe((result) => {
      expect(result).toEqual(mockScorePerQuestionReport);
      expect(reportsServiceMock.getGlobalAverageScorePerQuestion).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get technician tickets solved by technician ID successfully', (done) => {
    reportsServiceMock.getTicketsSolvedByTechnicianId.and.returnValue(of({ success: true, data: 30 }));
  
    service.getTechnicianTicketsSolvedByTechnicianId(1, '2025-01-01', '2025-01-31').subscribe((result) => {
      expect(result).toBe(30);
      expect(reportsServiceMock.getTicketsSolvedByTechnicianId).toHaveBeenCalledWith(1, '2025-01-01', '2025-01-31');
      done();
    });
  });
  
  it('should get technician average time to solve by ID successfully', (done) => {
    reportsServiceMock.getAverageTimeToSolvedByTechnicianId.and.returnValue(of({ success: true, data: 3.5 }));
  
    service.getTechnicianAverageTimeToSolveById(1, '2025-01-01', '2025-01-31').subscribe((result) => {
      expect(result).toBe(3.5);
      expect(reportsServiceMock.getAverageTimeToSolvedByTechnicianId).toHaveBeenCalledWith(1, '2025-01-01', '2025-01-31');
      done();
    });
  });
  
  it('should get technician tickets assigned and reassigned by ID successfully', (done) => {
    reportsServiceMock.getTTicketsAssignedReassignedByTechnicianId.and.returnValue(of({ success: true, data: mockTechnicianReassigns }));
  
    service.getTechnicianTicketsAssignedReassignedById(1, '2025-01-01', '2025-01-31').subscribe((result) => {
      expect(result).toEqual(mockTechnicianReassigns);
      expect(reportsServiceMock.getTTicketsAssignedReassignedByTechnicianId).toHaveBeenCalledWith(1, '2025-01-01', '2025-01-31');
      done();
    });
  });
  
  it('should get technician current tickets by ID successfully', (done) => {
    reportsServiceMock.getCurrentTicketsByTechnicianId.and.returnValue(of({ success: true, data: 15 }));
  
    service.getTechnicianCurrentTicketsById(1).subscribe((result) => {
      expect(result).toBe(15);
      expect(reportsServiceMock.getCurrentTicketsByTechnicianId).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should get technician weekly comparison by ID successfully', (done) => {
    reportsServiceMock.getWeeklyComparisonByTechnicianId.and.returnValue(of({ success: true, data: mockWeeklyComparison }));
  
    service.getTechnicianWeeklyComparisonById(1).subscribe((result) => {
      expect(result).toEqual(mockWeeklyComparison);
      expect(reportsServiceMock.getWeeklyComparisonByTechnicianId).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should get technician surveys average score successfully', (done) => {
    reportsServiceMock.getAverageScoreSurvey.and.returnValue(of({ success: true, data: 4.8 }));
  
    service.getTechnicianSurveysAverageScore(1).subscribe((result) => {
      expect(result).toBe(4.8);
      expect(reportsServiceMock.getAverageScoreSurvey).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should get technician survey average score per question successfully', (done) => {
    reportsServiceMock.getAverageScorePerQuestion.and.returnValue(of({ success: true, data: mockScorePerQuestionReport }));
  
    service.getTechnicianSurveryAverageScorePerQuestion(1).subscribe((result) => {
      expect(result).toEqual(mockScorePerQuestionReport);
      expect(reportsServiceMock.getAverageScorePerQuestion).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while getting global tickets solved quantity', (done) => {
    reportsServiceMock.getTicketsSolved.and.returnValue(throwError(() => new Error('Error fetching tickets solved')));
  
    service.getGlobalTicketsSolvedQty().subscribe((result) => {
      expect(result).toBe(0);
      expect(reportsServiceMock.getTicketsSolved).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting global average time to close', (done) => {
    reportsServiceMock.getAverageTimeToClose.and.returnValue(throwError(() => new Error('Error fetching average time to close')));
  
    service.getGlobalAverageTimeToClose().subscribe((result) => {
      expect(result).toBe(0.00);
      expect(reportsServiceMock.getAverageTimeToClose).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting global tickets escalations', (done) => {
    reportsServiceMock.getTicketsEscalations.and.returnValue(throwError(() => new Error('Error fetching tickets escalations')));
  
    service.getGlobalTicketsEscalations().subscribe((result) => {
      expect(result).toEqual([]);
      expect(reportsServiceMock.getTicketsEscalations).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting global tickets per complexity', (done) => {
    reportsServiceMock.getTicketsPerComplexity.and.returnValue(throwError(() => new Error('Error fetching tickets per complexity')));
  
    service.getGlobalTicketsPerComplexity().subscribe((result) => {
      expect(result).toEqual([]);
      expect(reportsServiceMock.getTicketsPerComplexity).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting global tickets human interaction', (done) => {
    reportsServiceMock.getTicketsHumanInteraction.and.returnValue(throwError(() => new Error('Error fetching tickets human interaction')));
  
    service.getGlobalTicketsHumanInteraction().subscribe((result) => {
      expect(result).toBe(0);
      expect(reportsServiceMock.getTicketsHumanInteraction).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting global average score per question', (done) => {
    reportsServiceMock.getGlobalAverageScorePerQuestion.and.returnValue(throwError(() => new Error('Error fetching global average score')));
  
    service.getGlobalAverageScore().subscribe((result) => {
      expect(result).toEqual([]);
      expect(reportsServiceMock.getGlobalAverageScorePerQuestion).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting technician tickets solved by ID', (done) => {
    reportsServiceMock.getTicketsSolvedByTechnicianId.and.returnValue(throwError(() => new Error('Error fetching tickets solved by technician ID')));
  
    service.getTechnicianTicketsSolvedByTechnicianId(1, '2025-01-01', '2025-01-31').subscribe((result) => {
      expect(result).toBe(0);
      expect(reportsServiceMock.getTicketsSolvedByTechnicianId).toHaveBeenCalledWith(1, '2025-01-01', '2025-01-31');
      done();
    });
  });
  
  it('should handle error while getting technician average time to solve by ID', (done) => {
    reportsServiceMock.getAverageTimeToSolvedByTechnicianId.and.returnValue(throwError(() => new Error('Error fetching average time to solve')));
  
    service.getTechnicianAverageTimeToSolveById(1, '2025-01-01', '2025-01-31').subscribe((result) => {
      expect(result).toBe(0);
      expect(reportsServiceMock.getAverageTimeToSolvedByTechnicianId).toHaveBeenCalledWith(1, '2025-01-01', '2025-01-31');
      done();
    });
  });
  
  it('should handle error while getting technician tickets assigned and reassigned by ID', (done) => {
    reportsServiceMock.getTTicketsAssignedReassignedByTechnicianId.and.returnValue(throwError(() => new Error('Error fetching tickets assigned and reassigned')));
  
    service.getTechnicianTicketsAssignedReassignedById(1, '2025-01-01', '2025-01-31').subscribe((result) => {
      expect(result).toEqual(new ReportTechnicianReassignsModel());
      expect(reportsServiceMock.getTTicketsAssignedReassignedByTechnicianId).toHaveBeenCalledWith(1, '2025-01-01', '2025-01-31');
      done();
    });
  });
  
  it('should handle error while getting technician current tickets by ID', (done) => {
    reportsServiceMock.getCurrentTicketsByTechnicianId.and.returnValue(throwError(() => new Error('Error fetching current tickets by ID')));
  
    service.getTechnicianCurrentTicketsById(1).subscribe((result) => {
      expect(result).toBe(0);
      expect(reportsServiceMock.getCurrentTicketsByTechnicianId).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while getting technician weekly comparison by ID', (done) => {
    reportsServiceMock.getWeeklyComparisonByTechnicianId.and.returnValue(throwError(() => new Error('Error fetching weekly comparison')));
  
    service.getTechnicianWeeklyComparisonById(1).subscribe((result) => {
      expect(result).toEqual(new ReportTechnicianWeeklyComparisonModel());
      expect(reportsServiceMock.getWeeklyComparisonByTechnicianId).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while getting technician surveys average score', (done) => {
    reportsServiceMock.getAverageScoreSurvey.and.returnValue(throwError(() => new Error('Error fetching average score survey')));
  
    service.getTechnicianSurveysAverageScore(1).subscribe((result) => {
      expect(result).toBe(0);
      expect(reportsServiceMock.getAverageScoreSurvey).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while getting technician survey average score per question', (done) => {
    reportsServiceMock.getAverageScorePerQuestion.and.returnValue(throwError(() => new Error('Error fetching average score per question')));
  
    service.getTechnicianSurveryAverageScorePerQuestion(1).subscribe((result) => {
      expect(result).toEqual([]);
      expect(reportsServiceMock.getAverageScorePerQuestion).toHaveBeenCalledWith(1);
      done();
    });
  });
});