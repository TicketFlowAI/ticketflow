import { inject, Injectable } from '@angular/core';
import { ReportsService } from '../api/servicios-mindsoftdev/reports.service';
import { Observable, map, catchError, of } from 'rxjs';
import { ReportTicketComplexityModel } from '../models/reports/global/fields/report-ticket-complexity.model';
import { ReportTechnicianReassignsModel } from '../models/reports/techinican-performance/fields/report-technician-reassigns.model';
import { ReportTechnicianWeeklyComparisonModel } from '../models/reports/techinican-performance/fields/report-technician-weekly-comparison.model';
import { ReportTicketEscalationsModel } from '../models/reports/global/fields/report-ticket-escalations.model';
import { IReportTechnicianScorePerQuestionResponse, ReportTechnicianScorePerQuestion } from '../models/reports/techinican-performance/fields/report-score-per-question.model';

@Injectable({
  providedIn: 'root'
})
export class ReportManagementService {
  private readonly reportService = inject(ReportsService)

  getGlobalTicketsSolvedQty(): Observable<number> {
    return this.reportService.getTicketsSolved().pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0);
      })
    )
  }

  getGlobalAverageTimeToClose(): Observable<number> {
    return this.reportService.getAverageTimeToClose().pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0.00);
      })
    )
  }

  getGlobalTicketsEscalations(): Observable<ReportTicketEscalationsModel[]> {
    return this.reportService.getTicketsEscalations().pipe(
      map((response) => response.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getGlobalTicketsPerComplexity(): Observable<ReportTicketComplexityModel[]> {
    return this.reportService.getTicketsPerComplexity().pipe(
      map((response) => response.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getGlobalTicketsHumanInteraction(): Observable<number> {
    return this.reportService.getTicketsHumanInteraction().pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0);
      })
    )
  }

  getGlobalAverageScore(): Observable<ReportTechnicianScorePerQuestion[]> {
    return this.reportService.getGlobalAverageScorePerQuestion().pipe(
      map((response) => response.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  getTechnicianTicketsSolvedByTechnicianId(id: number, startDate: string, endDate: string): Observable<number> {
    return this.reportService.getTicketsSolvedByTechnicianId(id, startDate, endDate).pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0);
      })
    );
  }

  getTechnicianAverageTimeToSolveById(id: number, startDate: string, endDate: string): Observable<number> {
    return this.reportService.getAverageTimeToSolvedByTechnicianId(id, startDate, endDate).pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0);
      })
    );
  }

  getTechnicianTicketsAssignedReassignedById(id: number, startDate: string, endDate: string): Observable<ReportTechnicianReassignsModel> {
    return this.reportService.getTTicketsAssignedReassignedByTechnicianId(id, startDate, endDate).pipe(
      map((response) => response.data),
      catchError(() => {
        return of(new ReportTechnicianReassignsModel())
      })
    );
  }

  getTechnicianCurrentTicketsById(id: number): Observable<number> {
    return this.reportService.getCurrentTicketsByTechnicianId(id).pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0);
      })
    );
  }

  getTechnicianWeeklyComparisonById(id: number): Observable<ReportTechnicianWeeklyComparisonModel> {
    return this.reportService.getWeeklyComparisonByTechnicianId(id).pipe(
      map((response) => response.data),
      catchError(() => {
        return of(new ReportTechnicianWeeklyComparisonModel());
      })
    );
  }

  getTechnicianSurveysAverageScore(id: number): Observable<number> {
    return this.reportService.getAverageScoreSurvey(id).pipe(
      map((response) => response.data),
      catchError(() => {
        return of(0);
      })
    );
  }

  getTechnicianSurveryAverageScorePerQuestion(id: number): Observable<ReportTechnicianScorePerQuestion[]> {
    return this.reportService.getAverageScorePerQuestion(id).pipe(
      map((response) => response.data),
      catchError(() => {
        return of([]);
      })
    );
  }
}
