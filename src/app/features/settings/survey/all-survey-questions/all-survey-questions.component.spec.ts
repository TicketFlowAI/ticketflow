import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSurveyQuestionsComponent } from './all-survey-questions.component';

describe('AllSurveyQuestionsComponent', () => {
  let component: AllSurveyQuestionsComponent;
  let fixture: ComponentFixture<AllSurveyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSurveyQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSurveyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
