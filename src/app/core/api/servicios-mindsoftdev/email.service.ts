import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { Observable } from 'rxjs';
import { IEmailTemplateApiResponse, IEmailTemplatesApiResponse } from '../../models/entities/email-template.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
//Variables
private readonly BASE_URL = environment.apiEndpoint
private readonly apiEmail = this.BASE_URL + '/api/emails'

//Services
http = inject(HttpClient)
customHeadersService = inject(CustomHeadersService)

//Methods
getEmailTemplates(): Observable<IEmailTemplatesApiResponse> {
  const customHeaders = this.customHeadersService.addAppJson().getHeaders()
  return this.http.get<IEmailTemplatesApiResponse>(`${this.apiEmail}`, {
    headers: customHeaders,
    withCredentials: true,
  });
}

getEmailTemplate(id: number): Observable<IEmailTemplateApiResponse> {
  const customHeaders = this.customHeadersService.addAppJson().getHeaders();
  return this.http.get<IEmailTemplateApiResponse>(`${this.apiEmail}/${id}`, {
    headers: customHeaders,
    withCredentials: true,
  });
}

getDeletedEmailTemplates(): Observable<IEmailTemplatesApiResponse> {
  const customHeaders = this.customHeadersService.addAppJson().getHeaders()
  return this.http.get<IEmailTemplatesApiResponse>(`${this.apiEmail}/deleted`, {
    headers: customHeaders,
    withCredentials: true,
  });
}

createEmailTemplate(email: any): Observable<HttpResponse<any>> {
  const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
  return this.http.post<any>(`${this.apiEmail}`, email, {
    headers: customHeaders,
    withCredentials: true,
    observe: 'response'
  });
}

updateEmailTemplate(email: any): Observable<HttpResponse<any>> {
  const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
  return this.http.put<any>(`${this.apiEmail}/${email.id}`, email, {
    headers: customHeaders,
    withCredentials: true,
    observe: 'response'
  });
}

deleteEmailTemplate(id: number): Observable<HttpResponse<any>> {
  const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
  return this.http.delete<any>(`${this.apiEmail}/${id}`, {
    headers: customHeaders,
    withCredentials: true,
    observe: 'response'
  });
}

restoreEmailTemplate(id: number): Observable<HttpResponse<any>> {
  const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
  return this.http.put<any>(`${this.apiEmail}/${id}/restore`, null, {
    headers: customHeaders,
    withCredentials: true,
    observe: 'response'
  });
}
}
