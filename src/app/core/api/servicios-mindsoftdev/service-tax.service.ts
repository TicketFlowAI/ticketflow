import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IServiceTaxApiResponse, ServiceTaxModel } from '../../models/entities/service-tax.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTaxService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiServiceTax = this.BASE_URL + '/api/taxes'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  //Methods
  getAllServiceTaxes(): Observable<IServiceTaxApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceTaxApiResponse>(`${this.apiServiceTax}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  getOneServiceTax(id: number): Observable<IServiceTaxApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceTaxApiResponse>(`${this.apiServiceTax}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  createServiceTax(serviceTax: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiServiceTax}`, serviceTax, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  updateServiceTax(serviceTax: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiServiceTax}`, serviceTax, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  deleteServiceTax(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<HttpResponse<any>>(`${this.apiServiceTax}/${id}` ,{
      headers: customHeaders,
      withCredentials: true,
    })
  }
}
