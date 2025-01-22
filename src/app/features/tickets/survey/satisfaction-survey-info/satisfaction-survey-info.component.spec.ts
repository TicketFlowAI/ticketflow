import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionSurveyInfoComponent } from './satisfaction-survey-info.component';

describe('SatisfactionSurveyInfoComponent', () => {
  let component: SatisfactionSurveyInfoComponent;
  let fixture: ComponentFixture<SatisfactionSurveyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionSurveyInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionSurveyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
