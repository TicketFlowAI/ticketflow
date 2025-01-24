import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SurveyService } from './survey.service';
import { environment } from '../../../../environments/environment';
import { ISurveyAnswersApiResponse } from '../../models/entities/survey.model';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpTestingController: HttpTestingController;

  const mockSurveyAnswersResponse: ISurveyAnswersApiResponse = {
    success: true,
    data: [
      {
        ticket_id: 1,
        user_id: 1,
        user_name: 'John',
        user_lastname: 'Doe',
        question_id: 1,
        question: 'How satisfied are you?',
        score: 5,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyService],
    });
    service = TestBed.inject(SurveyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a survey by ID (success case)', () => {
    const surveyId = 1;

    service.getSurvey(surveyId).subscribe((response) => {
      expect(response).toEqual(mockSurveyAnswersResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys/${surveyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSurveyAnswersResponse);
  });

  it('should handle error when getting a survey by ID', () => {
    const surveyId = 1;

    service.getSurvey(surveyId).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys/${surveyId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Internal Server Error' }, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should create a survey (success case)', () => {
    const newSurvey = {
      ticket_id: 1,
      user_id: 1,
      survey_answers: [{ question_id: 1, score: 5 }],
    };

    service.createSurvey(newSurvey).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSurvey);
    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should handle error when creating a survey', () => {
    const newSurvey = {
      ticket_id: 1,
      user_id: 1,
      survey_answers: [{ question_id: 1, score: 5 }],
    };

    service.createSurvey(newSurvey).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(400);
      },
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should update a survey (success case)', () => {
    const updatedSurvey = {
      id: 1,
      ticket_id: 1,
      user_id: 1,
      survey_answers: [{ question_id: 1, score: 4 }],
    };

    service.updateSurvey(updatedSurvey).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys/${updatedSurvey.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSurvey);
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should handle error when updating a survey', () => {
    const updatedSurvey = {
      id: 1,
      ticket_id: 1,
      user_id: 1,
      survey_answers: [{ question_id: 1, score: 4 }],
    };

    service.updateSurvey(updatedSurvey).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys/${updatedSurvey.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should delete a survey (success case)', () => {
    const surveyId = 1;

    service.deleteSurvey(surveyId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys/${surveyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should handle error when deleting a survey', () => {
    const surveyId = 1;

    service.deleteSurvey(surveyId).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/surveys/${surveyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Internal Server Error' }, { status: 500, statusText: 'Internal Server Error' });
  });
});
