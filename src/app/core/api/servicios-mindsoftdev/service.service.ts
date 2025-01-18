import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { Observable } from 'rxjs';
import { IServiceApiResponse, IServicesApiResponse } from '../../models/entities/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiServices = this.BASE_URL + '/api/services'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getServices(): Observable<IServicesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServicesApiResponse>(`${this.apiServices}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getService(id: number): Observable<IServiceApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceApiResponse>(`${this.apiServices}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getDeletedServices(): Observable<IServicesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServicesApiResponse>(`${this.apiServices}/deleted`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  createService(service: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiServices}`, service, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateService(service: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiServices}/${service.id}`, service, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteService(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete<any>(`${this.apiServices}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  restoreService(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiServices}/${id}/restore`, null, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
