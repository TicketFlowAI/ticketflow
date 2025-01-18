import { inject, Injectable } from '@angular/core';
import { IEmailIntervalApiResponse, IEmailIntervalsApiResponse } from '../../models/entities/email-interval.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class EmailIntervalService {
 //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiEmailInterval = this.BASE_URL + '/api/intervals'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getEmailIntervals(): Observable<IEmailIntervalsApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IEmailIntervalsApiResponse>(`${this.apiEmailInterval}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getEmailInterval(id: number): Observable<IEmailIntervalApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IEmailIntervalApiResponse>(`${this.apiEmailInterval}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getDeletedIntervals(): Observable<IEmailIntervalsApiResponse> {
      const customHeaders = this.customHeadersService.addAppJson().getHeaders()
      return this.http.get<IEmailIntervalsApiResponse>(`${this.apiEmailInterval}/deleted`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }

  createEmailInterval(interval: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiEmailInterval}`, interval, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateEmailInterval(interval: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiEmailInterval}/${interval.id}`, interval, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteEmailInterval(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete<any>(`${this.apiEmailInterval}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  restoreEmailInterval(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiEmailInterval}/${id}/restore`, null, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
