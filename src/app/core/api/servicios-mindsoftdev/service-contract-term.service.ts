import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IServiceContractTermApiResponse, IServiceContractTermsApiResponse } from '../../models/entities/service-contract-term.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractTermService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiServiceTerms = this.BASE_URL + '/api/serviceTerms'

  //ServiceTerms
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getServiceContractTerms(): Observable<IServiceContractTermsApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceContractTermsApiResponse>(`${this.apiServiceTerms}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getServiceContractTerm(id: number): Observable<IServiceContractTermApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceContractTermApiResponse>(`${this.apiServiceTerms}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  createServiceContractTerm(serviceContractTerm: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiServiceTerms}`, serviceContractTerm, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateServiceContractTerm(serviceContractTerm: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiServiceTerms}/${serviceContractTerm.id}`, serviceContractTerm, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteServiceContractTerm(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<any>(`${this.apiServiceTerms}/${id}` ,{
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
