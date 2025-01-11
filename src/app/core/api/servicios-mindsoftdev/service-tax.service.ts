import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IServiceTaxApiResponse, IServiceTaxesApiResponse } from '../../models/entities/service-tax.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTaxService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiServiceTax = this.BASE_URL + '/api/taxes'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getServiceTaxes(): Observable<IServiceTaxesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceTaxesApiResponse>(`${this.apiServiceTax}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getServiceTax(id: number): Observable<IServiceTaxApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceTaxApiResponse>(`${this.apiServiceTax}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  createServiceTax(serviceTax: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiServiceTax}`, serviceTax, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateServiceTax(serviceTax: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiServiceTax}/${serviceTax.id}`, serviceTax, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteServiceTax(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete<any>(`${this.apiServiceTax}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
