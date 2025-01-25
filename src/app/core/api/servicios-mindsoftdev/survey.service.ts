import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ISurveyAnswersApiResponse } from '../../models/entities/survey.model';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
 //Variables
    private readonly BASE_URL = environment.apiEndpoint
    private readonly apiSurveys = this.BASE_URL + '/api/surveys'
  
    //Surveys
    http = inject(HttpClient)
    customHeadersSurvey = inject(CustomHeadersService)
  
    //Methods
    getSurvey(id: number): Observable<ISurveyAnswersApiResponse> {
      const customHeaders = this.customHeadersSurvey.addAppJson().getHeaders()
      return this.http.get<ISurveyAnswersApiResponse>(`${this.apiSurveys}/${id}`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }
  
    createSurvey(survey: any): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurvey.addAppJson().addXsrfToken().getHeaders();
      return this.http.post<any>(`${this.apiSurveys}`, survey, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
  
    updateSurvey(survey: any): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurvey.addAppJson().addXsrfToken().getHeaders();
      return this.http.put<any>(`${this.apiSurveys}/${survey.id}`, survey, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
  
    deleteSurvey(id: number): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurvey.addAppJson().addXsrfToken().getHeaders();
      return this.http.delete<any>(`${this.apiSurveys}/${id}`, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
}
