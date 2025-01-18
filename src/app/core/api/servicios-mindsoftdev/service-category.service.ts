import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { Observable } from 'rxjs';
import { IServiceCategoriesApiResponse, IServiceCategoryApiResponse } from '../../models/entities/service-category.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  //Variables
  private readonly BASE_URL = environment.apiEndpoint
  private readonly apiCategories = this.BASE_URL + '/api/categories'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getServiceCategories(): Observable<IServiceCategoriesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceCategoriesApiResponse>(`${this.apiCategories}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getServiceCategory(id: number): Observable<IServiceCategoryApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders();
    return this.http.get<IServiceCategoryApiResponse>(`${this.apiCategories}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  getDeletedServiceCategories(): Observable<IServiceCategoriesApiResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()
    return this.http.get<IServiceCategoriesApiResponse>(`${this.apiCategories}/deleted`, {
      headers: customHeaders,
      withCredentials: true,
    });
  }

  createServiceCategory(serviceCategory: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.post<any>(`${this.apiCategories}`, serviceCategory, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  updateServiceCategory(serviceCategory: any): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiCategories}/${serviceCategory.id}`, serviceCategory, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  deleteServiceCategory(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.delete<any>(`${this.apiCategories}/${id}`, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  restoreServiceCategory(id: number): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addAppJson().addXsrfToken().getHeaders();
    return this.http.put<any>(`${this.apiCategories}/${id}/restore`, null, {
      headers: customHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }
}
