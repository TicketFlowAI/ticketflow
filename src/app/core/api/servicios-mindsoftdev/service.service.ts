import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { Observable } from 'rxjs';
import { IServiceApiResponse, ServiceModel } from '../../models/entities/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private apiServices = this.BASE_URL + '/api/services'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getAllServices(): Observable<IServiceApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceApiResponse>(`${this.apiServices}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  getOneService(id: number): Observable<IServiceApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceApiResponse>(`${this.apiServices}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  createService(service: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiServices}`, service, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  updateService(service: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.post<HttpResponse<any>>(`${this.apiServices}`, service, {
      headers: customHeaders,
      withCredentials: true,
    })
  }

  deleteService(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.delete<HttpResponse<any>>(`${this.apiServices}/${id}` ,{
      headers: customHeaders,
      withCredentials: true,
    })
  }
}
