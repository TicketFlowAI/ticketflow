import { TestBed } from '@angular/core/testing';

import { SurveyQuestionService } from './survey-question.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SurveyQuestionsService', () => {
  let service: SurveyQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SurveyQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
