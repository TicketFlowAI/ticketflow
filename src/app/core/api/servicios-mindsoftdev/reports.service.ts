import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IReportTicketComplaxityModelResponse } from '../../models/reports/global/fields/report-ticket-complexity.model';
import { IReportTechnicianReassingsModelResponse } from '../../models/reports/techinican-performance/fields/report-technician-reassigns.model';
import { IReportTechnicianWeeklyComparisonModelResponse } from '../../models/reports/techinican-performance/fields/report-technician-weekly-comparison.model';
import { IReportTicketEscalationsModelResponse } from '../../models/reports/global/fields/report-ticket-escalations.model';
import { IReportNumberResponse } from '../../models/reports/common-fields/report-number-response.model';
import { IReportTechnicianScorePerQuestionResponse } from '../../models/reports/techinican-performance/fields/report-score-per-question.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private readonly BASE_URL = environment.apiEndpoint;
  private readonly apiReports = this.BASE_URL + '/api/reports';

  // Services
  http = inject(HttpClient);
  customHeadersService = inject(CustomHeadersService);

  // Methods
  getTicketsSolved(): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/tickets-solved`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getAverageTimeToClose(): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/average-time-to-close`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getTicketsEscalations(): Observable<IReportTicketEscalationsModelResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportTicketEscalationsModelResponse>(`${this.apiReports}/tickets-escalations`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getTicketsPerComplexity(): Observable<IReportTicketComplaxityModelResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportTicketComplaxityModelResponse>(`${this.apiReports}/tickets-per-complexity`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getTicketsHumanInteraction(): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/tickets-human-interaction`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getGlobalAverageScorePerQuestion(): Observable<IReportTechnicianScorePerQuestionResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportTechnicianScorePerQuestionResponse>(`${this.apiReports}/average-score-per-question`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getTicketsSolvedByTechnicianId(userId: number, startDate: string, endDate: string): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/technician/${userId}/tickets-solved?start_date=${startDate}&end_date=${endDate}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getAverageTimeToSolvedByTechnicianId(userId: number, startDate: string, endDate: string): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/technician/${userId}/average-time-to-solve?start_date=${startDate}&end_date=${endDate}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getTTicketsAssignedReassignedByTechnicianId(userId: number, startDate: string, endDate: string): Observable<IReportTechnicianReassingsModelResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportTechnicianReassingsModelResponse>(`${this.apiReports}/technician/${userId}/tickets-assigned-reassigned?start_date=${startDate}&end_date=${endDate}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getCurrentTicketsByTechnicianId(userId: number): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/technician/${userId}/current-tickets`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getWeeklyComparisonByTechnicianId(userId: number): Observable<IReportTechnicianWeeklyComparisonModelResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportTechnicianWeeklyComparisonModelResponse>(`${this.apiReports}/technician/${userId}/weekly-comparison`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getAverageScoreSurvey(userId: number): Observable<IReportNumberResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportNumberResponse>(`${this.apiReports}/technician/${userId}/average-score-per-question`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getAverageScorePerQuestion(userId: number): Observable<IReportTechnicianScorePerQuestionResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IReportTechnicianScorePerQuestionResponse>(`${this.apiReports}/technician/${userId}/average-score`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }
}
