import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmailIntervalsComponent } from './all-email-intervals.component';

describe('AllEmailIntervalsComponent', () => {
  let component: AllEmailIntervalsComponent;
  let fixture: ComponentFixture<AllEmailIntervalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEmailIntervalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmailIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
