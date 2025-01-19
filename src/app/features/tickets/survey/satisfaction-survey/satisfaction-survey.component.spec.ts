import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionSurveyComponent } from './satisfaction-survey.component';

describe('SatisfactionSurveyComponent', () => {
  let component: SatisfactionSurveyComponent;
  let fixture: ComponentFixture<SatisfactionSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
