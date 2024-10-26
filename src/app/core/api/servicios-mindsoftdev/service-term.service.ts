import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IServiceTermApiResponse, IServiceTermsApiResponse } from '../../models/entities/service-term.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTermTermServiceTerm {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiServiceTerms = this.BASE_URL + '/api/serviceTermTerms'

  //ServiceTerms
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getServiceTerms(): Observable<IServiceTermsApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceTermsApiResponse>(`${this.apiServiceTerms}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  getServiceTerm(id: number): Observable<IServiceTermApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceTermApiResponse>(`${this.apiServiceTerms}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  createServiceTerm(serviceTerm: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiServiceTerms}`, serviceTerm, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  updateServiceTerm(serviceTerm: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiServiceTerms}`, serviceTerm, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  deleteServiceTerm(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<HttpResponse<any>>(`${this.apiServiceTerms}/${id}` ,{
      headers: customHeaders,
      withCredentials: true,
    })
  }
}
