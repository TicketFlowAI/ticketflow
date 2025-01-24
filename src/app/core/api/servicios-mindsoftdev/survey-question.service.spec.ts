import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SurveyQuestionService } from './survey-question.service';
import { environment } from '../../../../environments/environment';
import {
  ISurveyQuestionsApiResponse,
  ISurveyQuestionApiResponse,
  SurveyQuestionModel,
} from '../../models/entities/survey-question.model';

describe('SurveyQuestionService', () => {
  let service: SurveyQuestionService;
  let httpTestingController: HttpTestingController;

  const mockQuestionsResponse: ISurveyQuestionsApiResponse = {
    success: true,
    data: [
      new SurveyQuestionModel(1, 'What is your satisfaction level?', 1),
      new SurveyQuestionModel(2, 'How likely are you to recommend us?', 1),
    ],
  };

  const mockQuestionResponse: ISurveyQuestionApiResponse = {
    success: true,
    data: new SurveyQuestionModel(1, 'What is your satisfaction level?', 1),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyQuestionService],
    });
    service = TestBed.inject(SurveyQuestionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all survey questions', () => {
    service.getAllSurveyQuestions().subscribe((response) => {
      expect(response).toEqual(mockQuestionsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestionsResponse);
  });

  it('should get survey questions', () => {
    service.getSurveyQuestions().subscribe((response) => {
      expect(response).toEqual(mockQuestionsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestionsResponse);
  });

  it('should get a single survey question by ID', () => {
    const questionId = 1;

    service.getSurveyQuestion(questionId).subscribe((response) => {
      expect(response).toEqual(mockQuestionResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions/${questionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestionResponse);
  });

  it('should get deleted survey questions', () => {
    service.getDeletedSurveyQuestions().subscribe((response) => {
      expect(response).toEqual(mockQuestionsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestionsResponse);
  });

  it('should create a survey question', () => {
    const newQuestion = new SurveyQuestionModel(0, 'New Survey Question', 1);

    service.createSurveyQuestion(newQuestion).subscribe((response) => {
      expect(response.status).toBe(201);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newQuestion);

    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should update a survey question', () => {
    const updatedQuestion = new SurveyQuestionModel(1, 'Updated Survey Question', 1);

    service.updateSurveyQuestion(updatedQuestion).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions/${updatedQuestion.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedQuestion);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a survey question by ID', () => {
    const questionId = 1;

    service.deleteSurveyQuestion(questionId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions/${questionId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should restore a survey question by ID', () => {
    const questionId = 1;

    service.restoreSurveyQuestion(questionId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/survey-questions/${questionId}/restore`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBeNull();

    req.flush({}, { status: 200, statusText: 'OK' });
  });
});
