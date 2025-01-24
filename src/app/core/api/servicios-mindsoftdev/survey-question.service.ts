import { inject, Injectable } from '@angular/core';
import { ISurveyQuestionApiResponse, ISurveyQuestionsApiResponse } from '../../models/entities/survey-question.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomHeadersService } from '../../utils/custom-headers.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionService {
  //Variables
    private readonly BASE_URL = environment.apiEndpoint
    private readonly apiSurveyQuestions = this.BASE_URL + '/api/survey-questions'
  
    //SurveyQuestions
    http = inject(HttpClient)
    customHeadersSurveyQuestion = inject(CustomHeadersService)
  
    //Methods
    getAllSurveyQuestions(): Observable<ISurveyQuestionsApiResponse> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().getHeaders()
      return this.http.get<ISurveyQuestionsApiResponse>(`${this.apiSurveyQuestions}/all`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }
  
    getSurveyQuestions(): Observable<ISurveyQuestionsApiResponse> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().getHeaders()
      return this.http.get<ISurveyQuestionsApiResponse>(`${this.apiSurveyQuestions}`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }
  
    getSurveyQuestion(id: number): Observable<ISurveyQuestionApiResponse> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().getHeaders();
      return this.http.get<ISurveyQuestionApiResponse>(`${this.apiSurveyQuestions}/${id}`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }
  
    getDeletedSurveyQuestions(): Observable<ISurveyQuestionsApiResponse> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().getHeaders()
      return this.http.get<ISurveyQuestionsApiResponse>(`${this.apiSurveyQuestions}/deleted`, {
        headers: customHeaders,
        withCredentials: true,
      });
    }
  
    createSurveyQuestion(surveyQuestion: any): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().addXsrfToken().getHeaders();
      return this.http.post<any>(`${this.apiSurveyQuestions}`, surveyQuestion, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
  
    updateSurveyQuestion(surveyQuestion: any): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().addXsrfToken().getHeaders();
      return this.http.put<any>(`${this.apiSurveyQuestions}/${surveyQuestion.id}`, surveyQuestion, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
  
    deleteSurveyQuestion(id: number): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().addXsrfToken().getHeaders();
      return this.http.delete<any>(`${this.apiSurveyQuestions}/${id}`, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
  
    restoreSurveyQuestion(id: number): Observable<HttpResponse<any>> {
      const customHeaders = this.customHeadersSurveyQuestion.addAppJson().addXsrfToken().getHeaders();
      return this.http.put<any>(`${this.apiSurveyQuestions}/${id}/restore`, null, {
        headers: customHeaders,
        withCredentials: true,
        observe: 'response'
      });
    }
}
