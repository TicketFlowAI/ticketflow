import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSurveyQuestionComponent } from './manage-survey-question.component';

describe('ManageSurveyQuestionComponent', () => {
  let component: ManageSurveyQuestionComponent;
  let fixture: ComponentFixture<ManageSurveyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSurveyQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
