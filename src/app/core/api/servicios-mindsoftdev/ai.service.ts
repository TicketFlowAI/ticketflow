import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IAiClassifierPerformanceResponse, IAiClassifiersApiResponse } from '../../models/entities/ai-classifier.model';

@Injectable({
  providedIn: 'root'
})
export class AiService {
 //Variables
  private readonly BASE_URL = environment.apiEndpoint + '/api'

  //Services
  http = inject(HttpClient)
  customHeadersService = inject(CustomHeadersService)

  //Methods
  getClassifiersAndVersion(): Observable<IAiClassifiersApiResponse> {
    const customHeaders = this.customHeadersService.addXsrfToken().addAppJson().getHeaders()
    
    return this.http.get<IAiClassifiersApiResponse>(`${this.BASE_URL}/classifiers`, {
      headers: customHeaders,
      withCredentials: true
    });
  }

  getClassifierPerformance(versionArn: string): Observable<IAiClassifierPerformanceResponse> {
    const customHeaders = this.customHeadersService.addAppJson().getHeaders()

    const json = { classifierArn: versionArn };

    return this.http.post<IAiClassifierPerformanceResponse>(`${this.BASE_URL}/classifiers/performance`, json, {
      headers: customHeaders,
      withCredentials: true
    });
  }
}
