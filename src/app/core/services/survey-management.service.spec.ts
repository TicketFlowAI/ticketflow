import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SurveyManagementService } from './survey-management.service';
import { SurveyService } from '../api/servicios-mindsoftdev/survey.service';
import { SurveyQuestionService } from '../api/servicios-mindsoftdev/survey-question.service';
import { MessageService } from '../../shared/services/message.service';
import { TranslocoService } from '@jsverse/transloco';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco } from '@jsverse/transloco';
import { isDevMode } from '@angular/core';
import { TranslocoHttpLoader } from '../../transloco-loader';
import { HttpResponse } from '@angular/common/http';
import { SurveyModel, SurveyAnswerModel } from '../models/entities/survey.model';
import { SurveyQuestionModel } from '../models/entities/survey-question.model';

describe('SurveyManagementService', () => {
  let service: SurveyManagementService;
  let surveyServiceMock: jasmine.SpyObj<SurveyService>;
  let surveyQuestionServiceMock: jasmine.SpyObj<SurveyQuestionService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let translocoServiceMock: jasmine.SpyObj<TranslocoService>;

  const mockSurvey = new SurveyModel([
    new SurveyAnswerModel(
      1, // ticket_id
      1, // user_id
      'User', // user_name
      'Test', // user_lastname
      1, // question_id
      'Question 1', // question
      5 // score
    ),
  ]);

  const mockSurveyQuestion = new SurveyQuestionModel(
    1, // id
    'What is your satisfaction level?', // question
    1 // status
  );

  const mockSurveyQuestions = [mockSurveyQuestion];

  beforeEach(() => {
    const surveySpy = jasmine.createSpyObj('SurveyService', [
      'getSurvey',
      'createSurvey',
      'updateSurvey',
      'deleteSurvey',
    ]);

    const surveyQuestionSpy = jasmine.createSpyObj('SurveyQuestionService', [
      'getAllSurveyQuestions',
      'getSurveyQuestions',
      'getSurveyQuestion',
      'getDeletedSurveyQuestions',
      'createSurveyQuestion',
      'updateSurveyQuestion',
      'deleteSurveyQuestion',
      'restoreSurveyQuestion',
    ]);

    const messageSpy = jasmine.createSpyObj('MessageService', [
      'addSuccessMessage',
      'addErrorMessage',
      'addInfoMessage',
    ]);

    const translocoSpy = jasmine.createSpyObj('TranslocoService', ['translateObject']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader,
        }),
        { provide: SurveyService, useValue: surveySpy },
        { provide: SurveyQuestionService, useValue: surveyQuestionSpy },
        { provide: MessageService, useValue: messageSpy },
        { provide: TranslocoService, useValue: translocoSpy },
      ],
    });

    service = TestBed.inject(SurveyManagementService);
    surveyServiceMock = TestBed.inject(SurveyService) as jasmine.SpyObj<SurveyService>;
    surveyQuestionServiceMock = TestBed.inject(SurveyQuestionService) as jasmine.SpyObj<SurveyQuestionService>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    translocoServiceMock = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get survey by ticket ID successfully', (done) => {
    surveyServiceMock.getSurvey.and.returnValue(of({ success: true, data: mockSurvey.SurveyAnswers }));
  
    service.getSurveyByTicketId(1).subscribe((result) => {
      expect(result).toEqual(mockSurvey.SurveyAnswers);
      expect(surveyServiceMock.getSurvey).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should create a survey successfully', (done) => {
    surveyServiceMock.createSurvey.and.returnValue(of(new HttpResponse({ status: 201 })));
  
    service.addSurvey(mockSurvey).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyServiceMock.createSurvey).toHaveBeenCalledWith(mockSurvey);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should edit a survey successfully', (done) => {
    surveyServiceMock.updateSurvey.and.returnValue(of(new HttpResponse({ status: 200 })));
  
    service.editSurvey(mockSurvey).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyServiceMock.updateSurvey).toHaveBeenCalledWith(mockSurvey);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should delete a survey successfully', (done) => {
    surveyServiceMock.deleteSurvey.and.returnValue(of(new HttpResponse({ status: 200 })));
  
    service.deleteSurvey(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyServiceMock.deleteSurvey).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting survey by ticket ID', (done) => {
    surveyServiceMock.getSurvey.and.returnValue(throwError(() => new Error('Error fetching survey')));
  
    service.getSurveyByTicketId(1).subscribe((result) => {
      expect(result).toEqual([]);
      expect(surveyServiceMock.getSurvey).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addInfoMessage).not.toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while creating a survey', (done) => {
    surveyServiceMock.createSurvey.and.returnValue(throwError(() => new Error('Error creating survey')));
  
    service.addSurvey(mockSurvey).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyServiceMock.createSurvey).toHaveBeenCalledWith(mockSurvey);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while editing a survey', (done) => {
    surveyServiceMock.updateSurvey.and.returnValue(throwError(() => new Error('Error editing survey')));
  
    service.editSurvey(mockSurvey).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyServiceMock.updateSurvey).toHaveBeenCalledWith(mockSurvey);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while deleting a survey', (done) => {
    surveyServiceMock.deleteSurvey.and.returnValue(throwError(() => new Error('Error deleting survey')));
  
    service.deleteSurvey(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyServiceMock.deleteSurvey).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting survey by ticket ID', (done) => {
    surveyServiceMock.getSurvey.and.returnValue(throwError(() => new Error('Error fetching survey')));
  
    service.getSurveyByTicketId(1).subscribe((result) => {
      expect(result).toEqual([]);
      expect(surveyServiceMock.getSurvey).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addInfoMessage).not.toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while creating a survey', (done) => {
    surveyServiceMock.createSurvey.and.returnValue(throwError(() => new Error('Error creating survey')));
  
    service.addSurvey(mockSurvey).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyServiceMock.createSurvey).toHaveBeenCalledWith(mockSurvey);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while editing a survey', (done) => {
    surveyServiceMock.updateSurvey.and.returnValue(throwError(() => new Error('Error editing survey')));
  
    service.editSurvey(mockSurvey).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyServiceMock.updateSurvey).toHaveBeenCalledWith(mockSurvey);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while deleting a survey', (done) => {
    surveyServiceMock.deleteSurvey.and.returnValue(throwError(() => new Error('Error deleting survey')));
  
    service.deleteSurvey(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyServiceMock.deleteSurvey).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get all survey questions successfully', (done) => {
    surveyQuestionServiceMock.getAllSurveyQuestions.and.returnValue(of({ success: true, data: mockSurveyQuestions }));
  
    service.getAllSurveyQuestions().subscribe((questions) => {
      expect(questions).toEqual(mockSurveyQuestions);
      expect(surveyQuestionServiceMock.getAllSurveyQuestions).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get active survey questions successfully', (done) => {
    surveyQuestionServiceMock.getSurveyQuestions.and.returnValue(of({ success: true, data: mockSurveyQuestions }));
  
    service.getActiveSurveyQuestions().subscribe((questions) => {
      expect(questions).toEqual(mockSurveyQuestions);
      expect(surveyQuestionServiceMock.getSurveyQuestions).toHaveBeenCalled();
      done();
    });
  });
  
  it('should get one survey question successfully', (done) => {
    surveyQuestionServiceMock.getSurveyQuestion.and.returnValue(of({ success: true, data: mockSurveyQuestion }));
  
    service.getOneSurveyQuestion(1).subscribe((question) => {
      expect(question).toEqual(mockSurveyQuestion);
      expect(surveyQuestionServiceMock.getSurveyQuestion).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should get deleted survey questions successfully', (done) => {
    surveyQuestionServiceMock.getDeletedSurveyQuestions.and.returnValue(of({ success: true, data: mockSurveyQuestions }));
  
    service.getDeletedSurveyQuestions().subscribe((questions) => {
      expect(questions).toEqual(mockSurveyQuestions);
      expect(surveyQuestionServiceMock.getDeletedSurveyQuestions).toHaveBeenCalled();
      done();
    });
  });
  
  it('should create a survey question successfully', (done) => {
    surveyQuestionServiceMock.createSurveyQuestion.and.returnValue(of(new HttpResponse({ status: 201 })));
  
    service.addSurveyQuestion(mockSurveyQuestion).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyQuestionServiceMock.createSurveyQuestion).toHaveBeenCalledWith(mockSurveyQuestion);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should edit a survey question successfully', (done) => {
    surveyQuestionServiceMock.updateSurveyQuestion.and.returnValue(of(new HttpResponse({ status: 200 })));
  
    service.editSurveyQuestion(mockSurveyQuestion).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyQuestionServiceMock.updateSurveyQuestion).toHaveBeenCalledWith(mockSurveyQuestion);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should delete a survey question successfully', (done) => {
    surveyQuestionServiceMock.deleteSurveyQuestion.and.returnValue(of(new HttpResponse({ status: 200 })));
  
    service.deleteSurveyQuestion(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyQuestionServiceMock.deleteSurveyQuestion).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should restore a survey question successfully', (done) => {
    surveyQuestionServiceMock.restoreSurveyQuestion.and.returnValue(of(new HttpResponse({ status: 200 })));
  
    service.restoreSurveyQuestion(1).subscribe((result) => {
      expect(result).toBeTrue();
      expect(surveyQuestionServiceMock.restoreSurveyQuestion).toHaveBeenCalledWith(1);
      expect(messageServiceMock.addSuccessMessage).toHaveBeenCalled();
      done();
    });
  });

  it('should handle error while getting all survey questions', (done) => {
    surveyQuestionServiceMock.getAllSurveyQuestions.and.returnValue(throwError(() => new Error('Error fetching all survey questions')));
  
    service.getAllSurveyQuestions().subscribe((questions) => {
      expect(questions).toEqual([]);
      expect(surveyQuestionServiceMock.getAllSurveyQuestions).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting active survey questions', (done) => {
    surveyQuestionServiceMock.getSurveyQuestions.and.returnValue(throwError(() => new Error('Error fetching active survey questions')));
  
    service.getActiveSurveyQuestions().subscribe((questions) => {
      expect(questions).toEqual([]);
      expect(surveyQuestionServiceMock.getSurveyQuestions).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while getting one survey question', (done) => {
    surveyQuestionServiceMock.getSurveyQuestion.and.returnValue(throwError(() => new Error('Error fetching survey question')));
  
    service.getOneSurveyQuestion(1).subscribe((question) => {
      expect(question).toBeNull();
      expect(surveyQuestionServiceMock.getSurveyQuestion).toHaveBeenCalledWith(1);
      done();
    });
  });
  
  it('should handle error while getting deleted survey questions', (done) => {
    surveyQuestionServiceMock.getDeletedSurveyQuestions.and.returnValue(throwError(() => new Error('Error fetching deleted survey questions')));
  
    service.getDeletedSurveyQuestions().subscribe((questions) => {
      expect(questions).toEqual([]);
      expect(surveyQuestionServiceMock.getDeletedSurveyQuestions).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while creating a survey question', (done) => {
    surveyQuestionServiceMock.createSurveyQuestion.and.returnValue(throwError(() => new Error('Error creating survey question')));
    translocoServiceMock.translateObject.and.returnValue([]);
  
    service.addSurveyQuestion(mockSurveyQuestion).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyQuestionServiceMock.createSurveyQuestion).toHaveBeenCalledWith(mockSurveyQuestion);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while editing a survey question', (done) => {
    surveyQuestionServiceMock.updateSurveyQuestion.and.returnValue(throwError(() => new Error('Error editing survey question')));
    translocoServiceMock.translateObject.and.returnValue([]);
  
    service.editSurveyQuestion(mockSurveyQuestion).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyQuestionServiceMock.updateSurveyQuestion).toHaveBeenCalledWith(mockSurveyQuestion);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while deleting a survey question', (done) => {
    surveyQuestionServiceMock.deleteSurveyQuestion.and.returnValue(throwError(() => new Error('Error deleting survey question')));
    translocoServiceMock.translateObject.and.returnValue([]);
  
    service.deleteSurveyQuestion(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyQuestionServiceMock.deleteSurveyQuestion).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
  it('should handle error while restoring a survey question', (done) => {
    surveyQuestionServiceMock.restoreSurveyQuestion.and.returnValue(throwError(() => new Error('Error restoring survey question')));
    translocoServiceMock.translateObject.and.returnValue([]);
  
    service.restoreSurveyQuestion(1).subscribe((result) => {
      expect(result).toBeFalse();
      expect(surveyQuestionServiceMock.restoreSurveyQuestion).toHaveBeenCalledWith(1);
      expect(translocoServiceMock.translateObject).toHaveBeenCalled();
      expect(messageServiceMock.addErrorMessage).toHaveBeenCalled();
      done();
    });
  });
  
});
