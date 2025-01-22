import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { IAiClassifiersApiResponse } from '../../models/entities/ai-classifier.model';

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

  selectClassifiers(classiPrio: string, classiPrioHuma: string): Observable<HttpResponse<any>> {
    const customHeaders = this.customHeadersService.addXsrfToken().addAppJson().getHeaders()

    return this.http.post<HttpResponse<any>>(`${this.BASE_URL}/classifiers/update-classifiers`,
      {
        priority_classifier_arn: classiPrio,
        human_intervention_classifier_arn: classiPrioHuma
      }, {
      headers: customHeaders,
      withCredentials: true
    });
  }
}
